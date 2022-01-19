const converter = require('json-2-csv');
const fs = require('fs');


const data = JSON.parse(fs.readFileSync('./src/output/convertable.json'));


converter.json2csvAsync(data).then(csv => {

    
    console.log(csv);

    
    fs.writeFileSync('InstaData.csv', csv);

}).catch(err => console.log(err));