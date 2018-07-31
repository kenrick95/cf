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
- [ ] Visualization: responsive width
- [x] Sync db with remote pouch db
- [ ] Input: press tab to select recommended autocomplete item
- [x] Input: cancel edit
- [x] Input autocomplete: sort based on number of autcomplete item appearance
- [x] Input autocomplete: suggesstion should come from unfiltered entries?
- [ ] Input (date): use YYYY-MM-DD
- [ ] Input: Press enter should focus on next entry date
- [ ] Input autocomplete item menu: change to "absolute" instead of "fixed" (fix issue when page is scrolled)
- [ ] Settings: Show/hide settings
