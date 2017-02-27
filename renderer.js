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

let entriesDOM = document.querySelector('.entries')
let inputDOMs = document.querySelectorAll('.entry-input')
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
    this._id = (new Date()).toISOString()
    this.number = number
    this.date = date
    this.category = category
    this.name = name
    this.location = location
    this.amount = amount
  }
  getProperties () {
    return {
      _id: this._id,
      number: this.number,
      date: this.date,
      category: this.category,
      name: this.name,
      location: this.location,
      amount: this.amount
    }
  }
  render () {
    let rowDOM = document.createElement('tr')
    ;['number', 'date', 'category', 'name', 'location', 'amount'].forEach((name) => {
      let columnDOM = document.createElement('td')
      columnDOM.textContent = this[name]
      columnDOM.classList.add(`entry-${name}`)
      rowDOM.appendChild(columnDOM)
    })
    rowDOM.classList.add('entry')
    return rowDOM
  }
}
function initDefaultInput () {
  $('.entry-input-number').val(currentNumber)
  $('.entry-input-date').val(formatDate(new Date(), 'yyyy-MM-dd'))
  $('.entry-input-amount').val(0)
}
function clearInputs () {
  inputDOMs.forEach((entry) => {
    entry.value = ''
  })
  initDefaultInput()
}
function addEntry () {
  let data = {
    number: document.querySelector('.entry-input-number').value,
    date: document.querySelector('.entry-input-date').value,
    category: document.querySelector('.entry-input-category').value,
    name: document.querySelector('.entry-input-name').value,
    location: document.querySelector('.entry-input-location').value,
    amount: document.querySelector('.entry-input-amount').value
  }

  let entry = new Entry(data)
  db.putIfNotExists(entry.getProperties())
  clearInputs()
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
  })
}
function renderTotal () {
  if (entries.length === 0) {
    return
  }
  const totalValue = entries.reduce((previousValue, currentValue) => {
    if (previousValue.amount) {
      return parseInt(previousValue.amount) + parseInt(currentValue.amount)
    }
    return previousValue + parseInt(currentValue.amount)
  })
  $(totalDOM).text('$' + totalValue)
}
function renderAll () {
  // TODO find better way to append/delete/edit rather than re-render whole thing
  entriesDOM.innerHTML = ''
  let reverseEntries = entries.slice()
  reverseEntries.reverse().forEach((data) => {
    const entry = new Entry(data)
    entriesDOM.appendChild(entry.render())
  })
  renderTotal()
  currentNumber = entries.length + 1
  clearInputs()
}
inputDOMs.forEach((input) => {
  input.addEventListener('keypress', (evt) => {
    if (evt.keyCode === ENTER_KEY) {
      addEntry()
    }
  })
})
refresh()
