# cf

Personal cash flow record

Requirements:
- Input should be as convenient as Excel
  - Autocompletion (suggester)
  - Enter to go to new record
  - In-place editing
- Minus for spending, Positive for income
- Description should be automatically identified (entry should be just one field for name/description/category (like in Excel), but later should be automatically identified, maybe using NER)

## TODOs

- [x] PouchDB to store records
- [ ] "pouch-upsert" to handle updates
- [ ] "delta-pouch" to do only insertion and update; no more deletion (ledger)
- [ ] export & import to file, preferably .xlsx
- [ ] Do I want to use Vue? --> maybe good for rendering part (?)
