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

- PouchDB to store records
- PouchDB upsert to do only insertion and update; no more deletion (ledger)
- Do I want to use Vue?


```
D:\Cloud\GitHub\cf\node_modules\pouchdb\lib\index.js:5192 Uncaught (in promise) Error: Error: Could not locate the bindings file. Tried:
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\build\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\build\Debug\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\build\Release\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\out\Debug\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\Debug\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\out\Release\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\Release\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\build\default\leveldown.node
 → D:\Cloud\GitHub\cf\node_modules\pouchdb\node_modules\leveldown\compiled\6.5.0\win32\x64\leveldown.node: unable to import leveldown
 ```