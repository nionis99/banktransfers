const Calculations = require('./calculations');
const {financialCeiling} = require('./utils/financial');
const InOut = require('./utils/InOut');

let transfers;
const dataFile = process.argv[2];

const getAllCommissions = (dataFile) => {
    transfers = InOut.getData(dataFile);
    Calculations.calculateTransfersCommmissions(transfers);
    financialCeiling(Calculations.commissions);
    InOut.printData(Calculations.commissions);
}

const appInit = () => dataFile ? getAllCommissions(dataFile) : InOut.printNoDataFile()

appInit();

module.exports = getAllCommissions;