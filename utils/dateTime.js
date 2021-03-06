const moment = require('moment');
const Constants = require('../constants');

const getWeekNumber = date => moment(date, Constants.DATE_FORMAT).isoWeek();
const getYearNumber = date => moment(date, Constants.DATE_FORMAT).isoWeekYear();

const checkDate = (firstDate, secondDate) => getYearNumber(firstDate) === getYearNumber(secondDate)
    && getWeekNumber(firstDate) === getWeekNumber(secondDate);

module.exports = checkDate;
