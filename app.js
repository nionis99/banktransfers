const {financialCeiling} = require('./utils/financial');
const {getData, printNoDataFile, printData} = require('./utils/dataAccess');
const Config = require('./config/Config');
const Commission = require('./actions/Commission');
const dataFile = process.argv[2];

const getAllCommissions = async (dataFile) => {
    const transfers = getData(dataFile);
    const config = new Config();
    await config.requestConfig();
    const commission = new Commission(config);
    await commission.calculate(transfers);
    financialCeiling(commission.allCommissions);
    printData(commission.allCommissions);
}

const appInit = () => dataFile ? getAllCommissions(dataFile) : printNoDataFile()

appInit();