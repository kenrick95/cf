// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-upsert'))

var ENTER_KEY = 13
var db = new PouchDB('cf')

db.changes({
  since: 'now',
  live: true
}).on('change', refresh)

let entries = []

class Entry {
  constructor ({number = 0, date = new Date(), category = '', name = '', location = '', amount = ''} = {}) {
    this.number = number
    this.date = date
    this.category = category
    this.name = name
    this.location = location
    this.amount = amount
  }
  getProperties () {
    return {
      number: this.number,
      date: this.date,
      category: this.category,
      name: this.name,
      location: this.location,
      amount: this.amount
    }
  }
  render () {
    return `<tr class="entry">
          <td class="entry-number">${this.number}</td>
          <td class="entry-date">${this.date}</td>
          <td class="entry-category">${this.category}</td>
          <td class="entry-name">${this.name}</td>
          <td class="entry-location">${this.location}</td>
          <td class="entry-amount">${this.amount}</td>
        </tr>`
  }
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
  entries.push(entry)
  console.log(entry)
  db.putIfNotExists(entry.getProperties())
}

function refresh () {
  db.allDocs({include_docs: true, descending: true}, (err, doc) => {
    refreshRow(doc.rows)
  })
}
function refreshRow () {

}
document.querySelector('.input').addEventListener('keypress', (evt) => {
  if (evt.keyCode === ENTER_KEY) {
    addEntry()
  }
})
