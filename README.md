# cf

[![Greenkeeper badge](https://badges.greenkeeper.io/kenrick95/cf.svg)](https://greenkeeper.io/)

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
- [x] Migrate to TypeScript, annotate stuffs
- [x] Complete redux actions & reducers
- [x] Stylize a bit
- [x] Filter by month
- [x] Filter deleted
- [x] Double click to edit record
- [x] Autocompletion
- [x] export to file

### Nice to have
- [x] import from file
- [ ] Visualization: by category
- [ ] Visualization: by month
- [x] Visualization: by location
