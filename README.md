## **Initial Setup**
### **step 1**

Make sure you have nodejs installed in your machine.

Install "yarn" using npm install

`npm install --global yarn`

### **step 2**

Install all the necessary dependencies using the following command

`yarn`


## **Run Scripts**

### **step 1** 

Generates data.json file in src/output, which will store **all targeted links from source website**

`yarn generate`

### **step 2**

Create **filteredLinks.json** from data.json which includes **only unique targeted links**

`yarn filter`

**Note: before proceceeding to step3**
- create a file with name `.env` in root directory (where package.json exists)
- provide username, password in .env file
- example 
  - INSTA_USERNAME=username
  - INSTA_PASSWORD=password
### **step 3**

extract data from target and store it in result.json

`yarn extract`

### **step 4**

make result.json convertable by creating convertable.json

`yarn make_convertable`

### Exports

### Convert to CSV
`yarn convert2csv`

### Convert to Excel
`yarn convert2excel`

