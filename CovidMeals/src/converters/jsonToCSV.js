const converter = require('json-2-csv');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('output/convertable.json'));

converter.json2csvAsync(data).then(csv => {
    fs.writeFileSync('FoodInfo.csv', csv);

}).catch(err => console.log(err));