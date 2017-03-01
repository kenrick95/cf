// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/* global PouchDB, $ */

const ENTER_KEY = 13
let db = new PouchDB('cf')

db.changes({
  since: 'now',
  live: true
}).on('change', refresh)

let entriesDOM = $('.entries')
let inputDOMs = $('.entry-input')
const totalDOM = $('.foot-amount')
let currentNumber = 0

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
  constructor ({number = 0, date = new Date(), category = '', name = '', location = '', amount = ''} = {}) {
    this.date = new Date(date)
    this._id = formatDate(this.date, 'yyyy-MM-dd') + '-' + number
    this.number = number
    this.category = category
    this.name = name
    this.location = location
    this.amount = amount
  }
  getProperties () {
    return {
      _id: this._id,
      number: this.number,
      date: formatDate(this.date, 'yyyy-MM-dd'),
      category: this.category,
      name: this.name,
      location: this.location,
      amount: this.amount
    }
  }
  render () {
    let rowDOM = $('<tr />').addClass('entry')
    ;['number', 'date', 'category', 'name', 'location', 'amount'].forEach((name) => {
      $('<td />', {
        text: this.getProperties()[name]
      })
        .addClass(`entry-${name}`)
        .appendTo(rowDOM)
    })
    return rowDOM
  }
}
function initDefaultInput () {
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
}
let entries = []
function refresh () {
  db.allDocs({include_docs: true, descending: true}, (err, doc) => {
    if (err) {
      console.error(err)
    }
    entries = doc.rows.map((doc) => {
      return doc.doc
    })
    renderAll()
    clearInputs()
    focusInputDate()
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
function renderAll () {
  // TODO find better way to append/delete/edit rather than re-render whole thing
  $(entriesDOM).html('')
  let reverseEntries = entries.slice()
  reverseEntries.reverse().forEach((data) => {
    const entry = new Entry(data)
    $(entriesDOM).append(entry.render())
  })
  renderTotal()
  currentNumber = entries.length + 1
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
})

refresh()
