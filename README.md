# cf

Personal cash flow record

Requirements:
- Input should be as convenient as Excel
  - Autocompletion (suggester)
  - Enter to go to new record
  - In-place editing
- Description should be automatically identified (entry should be just one field for name/description/category (like in Excel), but later should be automatically identified, maybe using NER)

## TODOs

- [x] Restructure using React, build using Parcel
- [x] Integrate with PouchDB (pouchdb-browser)
- [x] Integrate Pouchdb with Redux (pouch-redux-middleware)
- [ ] Migrate to TypeScript, annotate stuffs
- [ ] Complete redux actions & reducers
- [ ] Filter by month
- [ ] Filter deleted
- [ ] Double click to edit record
- [ ] Autocompletion
- [ ] export & import to file, preferably .xlsx
- [ ] Monthly summary, reports, visualization
