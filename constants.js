class Constants {
    static DATE_FORMAT = "YYYY-MM-DD";
    static CASH_OUT_WEEK_LIMIT = 1000;
    static CASH_IN_COMMISSION = 0.03;
    static CASH_OUT_COMMISSION = 0.3;
    static MAX_CASH_IN_COMMISSION = 5;
    static LEGAL_PERSON_MIN_COMMISSION = 0.5;
    static USER_TYPES = {
        NATURAL: "nartural",
        JURIDICAL: "juridical"
    };
    static TRANSFER_TYPES = {
        CASH_IN: "cash_in",
        CASH_OUT: "cash_out"
    };
}

module.exports = Constants;