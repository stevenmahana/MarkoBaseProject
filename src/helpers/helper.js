var dateFormat = require('dateformat');

module.exports = {

    reverse: function(str) {
        var out = "";
        for (var i=str.length-1; i>=0; i--) {
            out += str.charAt(i);
        }
        return out;
    },
    timestamp: function(ts) {
        var day = 0;
        if (ts)
            day = moment.unix(ts).format("MM-DD-YYYY HH:mm");

        return day
    },
    ts2Date: function(unix_timestamp) { // == [ CONVERT TIME STAMP TO FORMATTED DATE ] == //
        var new_date = 'unknown';
        if(unix_timestamp) {
            var new_date_obj = new Date(unix_timestamp * 1000);
            new_date = dateFormat(new_date_obj, "mmmm dS, HH:MM");
        }
        return new_date;        
    },
    convertDate: function(date) { // == [ CONVERT NON-FORMATTED DATE TO FORMATTED DATE ] == //
        var new_date = 'unknown';
        if(date) {
            var new_date_obj = new Date(date);
            new_date = dateFormat(new_date_obj, "dddd, mmmm dS, h:MM TT");
        }
        return new_date;
    },
    convertPrice: function(number) { // == [ CONVERT FLOAT OR INT TO US CURRENCY ] == //
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        return formatter.format(number);
    },
    camelCase: function(str) {  // == [ CONVERT CAMEL CASED STRING TO REGULAR SENTENCE OR PHRASE ] == //
        var new_str = str;
        if(str) {
            new_str = str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
        }
        return new_str
    },
    stringifyJson: function(obj) { // == [ CONVERT JSON OBJECT TO STRING ] == //
        return JSON.stringify(obj);
    },
    parseJson: function(obj) { // == [ CONVERT JSON STRING TO OBJECT ] == //
        return JSON.parse(obj);
    },
};
