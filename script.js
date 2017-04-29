/* global PouchDB, $ */

const ENTER_KEY = 13
let db = new PouchDB('cf')

db.changes({
  since: 'now',
  live: true
})
var remoteCouch = 'https://pine.lan:6984/cf'

let entriesDOM = $('.entries')
let inputDOMs = $('.entry-input')
const totalDOM = $('.foot-amount')
let currentNumber = 0
let showDeleted = false
let entries = []
const filters = {
  months: {
    data: ['All'],
    active: 0,
    construct: (item) => {
      if (!filters.months.data) {
        filters.months.data = []
      }
      const date = formatDate(item.date, 'yyyy-MM')
      if (filters.months.data.indexOf(date) === -1) {
        filters.months.data.push(date)
      }
    },
    apply: (item) => {
      if (filters.months.active === 0) {
        return true
      }
      return formatDate(item.date, 'yyyy-MM') === filters.months.data[filters.months.active]
    }
  }
}

function constructFilters (item) {
  Object.values(filters).forEach(filter => {
    filter.construct(item)
  })
}

function pad (string, amount, padChar) {
  let returnString = String(string)
  const requiredLength = amount - returnString.length
  for (var i = 0; i < requiredLength; i++) {
    returnString = padChar + returnString
  }
  return returnString
}
function formatDate (date, format) {
  let dateString = format
  dateString = dateString.replace('yyyy', date.getFullYear())
  dateString = dateString.replace('MM', pad(date.getMonth() + 1, 2, '0'))
  dateString = dateString.replace('dd', pad(date.getDate(), 2, '0'))
  return dateString
}

class Entry {
  constructor ({ number = 0, date = new Date(), category = '', name = '', location = '', amount = '', deleted = false, customId = null } = {}) {
    this.date = new Date(date)
    if (customId) {
      this._id = customId
    } else {
      this._id = formatDate(this.date, 'yyyy-MM-dd') + '-' + number
    }
    this.number = number
    this.category = category
    this.name = name
    this.location = location
    this.amount = amount
    this.deleted = deleted
    this._row = ''
    this._rendered = false

    constructFilters(this)
  }
  getProperties () {
    return {
      _id: this._id,
      deleted: this.deleted,
      number: this.number,
      date: formatDate(this.date, 'yyyy-MM-dd'),
      category: this.category,
      name: this.name,
      location: this.location,
      amount: this.amount
    }
  }
  toggleDelete () {
    this.deleted = !this.deleted
    db.upsert(this._id, (doc) => {
      doc.deleted = this.deleted
      return doc
    })
  }
  isVisible () {
    return filters.months.apply(this) && !(this.deleted && !showDeleted)
  }
  renderVisibility () {
    if (this.isVisible()) {
      $(this._row).show()
    } else {
      $(this._row).hide()
    }
    if (this.deleted) {
      $(this._row).find('.label-deleted').show()
    } else {
      $(this._row).find('.label-deleted').hide()
    }
  }
  updateRender () {
    ;['number', 'date', 'category', 'name', 'location', 'amount'].forEach((name) => {
      $(this._row).find(`.entry-${name}`).text(this.getProperties()[name])
    })
    this.renderVisibility()
  }
  render () {
    if (this._rendered) {
      this.updateRender()
      return ''
    }
    this._rendered = true

    let rowDOM = $('<tr />').addClass('entry')
      ;['number', 'date', 'category', 'name', 'location', 'amount'].forEach((name) => {
        $('<td />', {
          text: this.getProperties()[name]
        }).addClass(`entry-${name}`)
          .appendTo(rowDOM)
      })
    $('<td />', {
      html: [
        $('<button/>', {
          html: $('<span/>')
            .addClass('glyphicon')
            .addClass('glyphicon-trash')
        }).addClass('btn')
          .addClass('btn-danger')
          .addClass('btn-sm')
          .on('click', () => {
            this.toggleDelete(this._id)
            this.render()
          }),
        ' ',
        $('<span/>', {
          text: 'Deleted'
        }).addClass('label')
          .addClass('label-danger')
          .addClass('label-sm')
          .addClass('label-deleted')
          .hide()
      ]
    }).addClass('entry-control')
      .appendTo(rowDOM)

    this._row = rowDOM
    this.renderVisibility()
    return rowDOM
  }
}
function initDefaultInput () {
  currentNumber = entries.length + 1
  $('.entry-input-number').val(currentNumber)
  $('.entry-input-date').val(formatDate(new Date(), 'yyyy-MM-dd'))
  $('.entry-input-amount').val(0)
}
function clearInputs () {
  $(inputDOMs).val('')
  initDefaultInput()
}
function addEntry () {
  let data = {
    number: $('.entry-input-number').val(),
    date: $('.entry-input-date').val(),
    category: $('.entry-input-category').val(),
    name: $('.entry-input-name').val(),
    location: $('.entry-input-location').val(),
    amount: $('.entry-input-amount').val()
  }

  let entry = new Entry(data)
  db.putIfNotExists(entry.getProperties())

  entries.push(entry)
  $(entriesDOM).append(entry.render())
  renderTotal()
}
function refresh () {
  db.allDocs({
    include_docs: true
  }, (err, doc) => {
    if (err) {
      console.error(err)
    }
    console.log(doc)
    entries = doc.rows.map((doc) => {
      const data = doc.doc
      data.customId = doc.id
      return new Entry(data)
    })
    renderInit()
  })
}
function renderTotal () {
  let totalValue = 0
  entries.forEach(entry => {
    if (entry.amount && entry.isVisible()) {
      totalValue += parseFloat(entry.amount)
    }
  })
  $(totalDOM).text('$' + totalValue.toFixed(2))
}
function renderInit () {
  $(entriesDOM).html('')
  entries.forEach((entry) => {
    $(entriesDOM).append(entry.render())
  })
  $('.filter-month').html(filters.months.data.map((month, index) => $('<option />', {
    html: month,
    value: index
  })))
  $('.filter-month').on('input', (e) => {
    filters.months.active = parseInt($(e.target).val())
    entries.forEach((entry) => {
      entry.render()
    })
    renderTotal()
  })
  renderTotal()
  clearInputs()
  focusInputDate()
}
function focusInputDate () {
  $('.entry-input-date').focus()
}
$(document).ready(() => {
  $(inputDOMs).on('keypress', (evt) => {
    if (evt.keyCode === ENTER_KEY) {
      addEntry()
      clearInputs()
      focusInputDate()
    }
  })
  $('.show-deleted').click((e) => {
    $(e.target).toggleClass('active')
    showDeleted = !showDeleted
    entries.forEach((entry) => {
      entry.render()
    })
  })
})
function sync () {
  // syncDom.setAttribute('data-sync-state', 'syncing')
  var opts = { live: true }
  db.replicate.to(remoteCouch, opts, syncError)
  db.replicate.from(remoteCouch, opts, syncError)
}
function syncError () {
  // syncDom.setAttribute('data-sync-state', 'error');
}

refresh()
if (remoteCouch) {
  sync()
}
