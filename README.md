
## step 1 

Generates data.json file which includes all instagram links from thetalentedindian.com website

`yarn generate`

## step 2

Create filteredLinks.json from data.json which includes only unique instagram links

`yarn filter`

**Note: before proceceeding to step3**
- provide instagram username, instagram password in .env file
- example 
  - INSTA_USERNAME=username
  - INSTA_PASSWORD=password
- turn on VPN
## step 3


`yarn extract`
extract data from instagram and store it in result.json

## Exports

### Convert to CSV
`yarn convert2csv`

### Convert to Excel
`yarn convert2excel`

