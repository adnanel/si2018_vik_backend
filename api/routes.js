import Reporting from "./reporting";
import {applyFilter} from "./filter_utils";

const fs = require('fs');


function makeListConsumer(fpath) {
    if ( !fs.existsSync(fpath) ) {
        throw fpath + " doesn't exist!";
    }

    return function(req, res) {
        let data = JSON.parse(fs.readFileSync(fpath)).filter(function(elem) {
            if ( elem.hasOwnProperty("deleted") && elem.deleted === true ) {
                return false;
            }
            return true;
        });

        if ( req.query.filter !== undefined ) {
            let apiFilter = JSON.parse(req.query.filter);

            applyFilter(data, apiFilter);
        }


        res.send(JSON.stringify(data));
    }
}

module.exports = {
    registerRoutes: function registerRoutes(express) {
        express.get('/pipes', makeListConsumer(__dirname + '/repo/pipes.json'));


        // reporting
        express.get('/report', function(req, res) {
            let apiFilter = null;
            if ( req.query.filter !== undefined ) {
                apiFilter = JSON.parse(req.query.filter);
            }

            res.send( JSON.stringify(Reporting.GenerateReport(apiFilter)) );
        });
    }
};

