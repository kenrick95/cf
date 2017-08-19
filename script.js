/* global PouchDB, $ */

const ENTER_KEY = 13
const db = new PouchDB('cf')
db.changes({
  since: 'now',
  live: true
})
const remoteCouch = 'https://pine.lan:6984/cf'

/** Filters */
const filters = {
  months: {
    data: ['All'],
    active: 0,
    construct: item => {
      if (!filters.months.data) {
        filters.months.data = []
      }
      const date = formatDate(item.date, 'yyyy-MM')
      if (filters.months.data.indexOf(date) === -1) {
        filters.months.data.push(date)
      }
    },
    apply: item => {
      if (filters.months.active === 0) {
        return true
      }
      return (
        formatDate(item.date, 'yyyy-MM') ===
        filters.months.data[filters.months.active]
      )
    }
  },
  showDeleted: {
    active: false,
    construct: () => {},
    apply: item => {
      return !item.deleted || filters.showDeleted.active
    }
  }
}

function applyFilters (item) {
  return Object.values(filters).map(filter => filter.apply(item))
}

function constructFilters (item) {
  Object.values(filters).forEach(filter => filter.construct(item))
}

/** utils */
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
  constructor (
    {
      number = 0,
      date = new Date(),
      category = '',
      name = '',
      location = '',
      amount = '',
      deleted = false,
      customId = null
    } = {}
  ) {
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
    db.upsert(this._id, doc => {
      doc.deleted = this.deleted
      return doc
    })
  }
  isVisible () {
    return applyFilters(this).reduce((a, b) => a && b)
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
    ;[
      'number',
      'date',
      'category',
      'name',
      'location',
      'amount'
    ].forEach(name => {
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
    ;[
      'number',
      'date',
      'category',
      'name',
      'location',
      'amount'
    ].forEach(name => {
      $('<td />', {
        text: this.getProperties()[name]
      })
        .addClass(`entry-${name}`)
        .appendTo(rowDOM)
    })
    $('<td />', {
      html: [
        $('<button/>', {
          html: $('<span/>').addClass('glyphicon').addClass('glyphicon-trash')
        })
          .addClass('btn')
          .addClass('btn-danger')
          .addClass('btn-sm')
          .on('click', () => {
            this.toggleDelete(this._id)
            this.render()
          }),
        ' ',
        $('<span/>', {
          text: 'Deleted'
        })
          .addClass('label')
          .addClass('label-danger')
          .addClass('label-sm')
          .addClass('label-deleted')
          .hide()
      ]
    })
      .addClass('entry-control')
      .appendTo(rowDOM)

    this._row = rowDOM
    this.renderVisibility()
    return rowDOM
  }
}

class Entries {
  constructor () {
    this.entries = []
    this._dom = $('.entries')
  }
  render () {
    this._dom.html(
      this.entries.map(entry => {
        return entry.render()
      })
    )
  }
}
class MainInput {
  constructor ({ number = 0 } = {}) {
    this._dom = $('.entry-new')
    this.number = number
  }
  focusInputDate () {
    $('.entry-input-date').focus()
  }
  clear () {
    $(this._dom).find('.entry-input').val('')
    $('.entry-input-number').val(this.number)
    $('.entry-input-date').val(formatDate(new Date(), 'yyyy-MM-dd'))
    $('.entry-input-amount').val(0)
  }
  render () {
    this._dom.html(
      `<td class="entry-new-number form-group">
      <input type="text" class="form-control entry-input entry-input-number" disabled value="${this.number}"/>
    </td>
    <td class="entry-new-date form-group">
      <input type="date" class="form-control entry-input entry-input-date" required value="${formatDate(new Date(), 'yyyy-MM-dd')}"/>
    </td>
    <td class="entry-new-category form-group">
      <input type="text" class="form-control entry-input entry-input-category" />
    </td>
    <td class="entry-new-name form-group">
      <input type="text" class="form-control entry-input entry-input-name" required />
    </td>
    <td class="entry-new-location form-group">
      <input type="text" class="form-control entry-input entry-input-location" />
    </td>
    <td class="entry-new-amount form-group">
      <input type="number" step="0.01" class="form-control entry-input entry-input-amount" required value="0"/>
    </td>
    <td class="entry-new-control">
      &nbsp;
    </td>`
    )
  }
}
class TotalAmount {
  constructor ({ totalAmount = 0 } = {}) {
    this._dom = $('.foot-amount')
  }
  render () {
    $(this._dom).text('$' + this.totalAmount.toFixed(2))
  }
}
class App {
  constructor () {
    this.entries = new Entries()
    this.mainInput = new MainInput()
    this.totalAmount = new TotalAmount()
    this.showDeleted = false

    this.refresh()
    if (remoteCouch) {
      this.sync()
    }

    $('.filter-show-deleted').click(e => {
      $(e.target).toggleClass('active')
      this.showDeleted = !this.showDeleted
      filters.showDeleted.active = this.showDeleted
      this.entries.entries.forEach(entry => {
        entry.updateRender()
      })
    })
    $(this.mainInput._dom).on('keypress', evt => {
      if (evt.keyCode === ENTER_KEY) {
        this.addEntry()
        this.mainInput.number = this.entries.entries.length + 1
        this.mainInput.clear()
        this.mainInput.focusInputDate()
      }
    })
    $('.filter-month').on('input', e => {
      filters.months.active = parseInt($(e.target).val())
      this.entries.entries.forEach(entry => {
        entry.updateRender()
      })
      this.updateTotalAmount()
      this.totalAmount.render()
    })
  }
  sync () {
    var opts = { live: true }
    db.replicate.to(remoteCouch, opts)
    db.replicate.from(remoteCouch, opts)
  }
  updateTotalAmount () {
    let totalValue = 0
    this.entries.entries.forEach(entry => {
      if (entry.amount && entry.isVisible()) {
        totalValue += parseFloat(entry.amount)
      }
    })
    this.totalAmount.totalAmount = totalValue
  }
  render () {
    this.entries.render()

    this.mainInput.number = this.entries.entries.length + 1
    this.mainInput.render()

    this.updateTotalAmount()
    this.totalAmount.render()
    this.mainInput.clear()
    this.mainInput.focusInputDate()

    $('.filter-month').html(
      filters.months.data.map((month, index) =>
        $('<option />', {
          html: month,
          value: index
        })
      )
    )
  }
  addEntry () {
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

    this.entries.entries.push(entry)
    this.entries._dom.append(entry.render())

    this.updateTotalAmount()
    this.totalAmount.render()
  }
  refresh () {
    db.allDocs(
      {
        include_docs: true
      },
      (err, doc) => {
        if (err) {
          console.error(err)
        }
        console.log(doc)
        this.entries.entries = doc.rows.map(doc => {
          const data = doc.doc
          data.customId = doc.id
          return new Entry(data)
        })
        this.render()
      }
    )
  }
}

$(document).ready(() => {
  const app = new App()
})
