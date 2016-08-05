# react-collapsible-table

React-collapsible-table is a reusable table component.
Main features:
- Expandable rows with extra data
- Columns visibility filtering

# Usage
`<Table cols={exampleCols} rows={exampleRows} hiddenColumns={[]} expandRenderComponent={ExpandRenderer}/ >`

# exampleCols
exampleCols is a collection of objects in the format:

```
var exampleCols = [{"Name": "User Name", "DataName": "user_name"},
    {"Name": "City", "DataName": "city"},
    {"Name": "Phone", "DataName": "phone"}];
```
    
    
#exampleRows 

exampleRows is a collection of objects in the format:

```
var exampleRows = [{"user_name": "Jael Bush", "phone": "055 2227 9788", "city": "Vedrin"},
    {"user_name": "Grace Mathews", "phone": "056 7656 9273", "city": "Schwerin"},
    {"user_name": "Caesar Mcmahon", "phone": "0346 737 5936", "city": "Rendsburg"},
    {"user_name": "Eric Lloyd", "phone": "056 1415 3027", "city": "Laon"}];
```

#hiddenColumns 

hiddenColumns is an array of DataName of the hidden columns.

```hiddenColumns={['user_name', 'city']}```
Can be empty so all columns are visible by default.

#expandRenderComponent
expandRenderComponent is a custom component which renders extra data.
