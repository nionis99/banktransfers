const fs = require('fs');

const printData = (array) => array.forEach(item => process.stdout.write(item + '\n'));
const getData = (dataFile) => JSON.parse(fs.readFileSync(dataFile));
const printNoDataFile = () => process.stdout.write("data file has not provided");

module.exports = {printData, getData, printNoDataFile}