const fs = require('fs')
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

const data = JSON.parse(fs.readFileSync('./src/output/result.json'));


const headingColumnNames = [
    "Name",
    "Profession",
    "Posts",
    "Followers",
    "Following",
    "InstaHandle"
]


let headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
    ws.cell(1, headingColumnIndex++)
        .string(heading)
});

let rowIndex = 2;
data.forEach( record => {
    let columnIndex = 1;
    Object.keys(record ).forEach(columnName =>{
        ws.cell(rowIndex,columnIndex++)
            .string(record [columnName])
    });
    rowIndex++;
}); 
wb.write('InstaData.xlsx');