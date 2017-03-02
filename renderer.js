// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/* global PouchDB, $ */

const ENTER_KEY = 13
let db = new PouchDB('cf')

db.changes({
  since: 'now',
  live: true
})

let entriesDOM = $('.entries')
let inputDOMs = $('.entry-input')
const totalDOM = $('.foot-amount')
let currentNumber = 0
let showDeleted = false
let entries = []

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
  constructor ({number = 0, date = new Date(), category = '', name = '', location = '', amount = '', deleted = false} = {}) {
    this.date = new Date(date)
    this._id = formatDate(this.date, 'yyyy-MM-dd') + '-' + number
    this.number = number
    this.category = category
    this.name = name
    this.location = location
    this.amount = amount
    this.deleted = deleted
    this._row = ''
    this._rendered = false
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
  renderVisibility () {
    if (this.deleted && !showDeleted) {
      $(this._row).hide()
    } else {
      $(this._row).show()
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
      return new Entry(doc.doc)
    })
    renderInit()
  })
}
function renderTotal () {
  let totalValue = 0
  if (entries.length === 0) {
    return
  } else if (entries.length === 1) {
    totalValue = entries[0].amount
  } else {
    totalValue = entries.reduce((previousValue, currentValue) => {
      if (previousValue.amount) {
        return parseInt(previousValue.amount) + parseInt(currentValue.amount)
      }
      return previousValue + parseInt(currentValue.amount)
    })
  }
  $(totalDOM).text('$' + totalValue)
}
function renderInit () {
  $(entriesDOM).html('')
  entries.forEach((entry) => {
    $(entriesDOM).append(entry.render())
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
    console.log('showDeleted', showDeleted)
    entries.forEach((entry) => {
      entry.render()
    })
  })
})

refresh()
