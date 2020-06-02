const fs = require('fs');

class InOut {
    static printData = (array) => array.forEach(item => process.stdout.write(item + '\n'));
    static getData = (dataFile) => JSON.parse(fs.readFileSync(dataFile));
    static printNoDataFile = () => process.stdout.write("data file has not provided");
}

module.exports = InOut;