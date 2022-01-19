
## step 1 

Generates data.json file which includes all targeted links from source website

`yarn generate`

## step 2

Create filteredLinks.json from data.json which includes only unique targeted links

`yarn filter`

**Note: before proceceeding to step3**
- provide username, password in .env file
- example 
  - INSTA_USERNAME=username
  - INSTA_PASSWORD=password
- turn on VPN
## step 3


`yarn extract`
extract data from target and store it in result.json

`yarn make_convertable`
make result.json convertable by creating convertable.json

## Exports

### Convert to CSV
`yarn convert2csv`

### Convert to Excel
`yarn convert2excel`

