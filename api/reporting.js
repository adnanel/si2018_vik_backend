import {applyFilter} from "./filter_utils";

class Reporting {
    static GenerateReport(filter: ApiFilter|ApiFilterGroup) {
        const dummy = [
            {
                "activity": "pipe_add",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "section_disable",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "section_enable",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "pipe_remove",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "construction_add",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "construction_remove",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "mstation_add",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "mstation_remove",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "failure_add",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            },
            {
                "activity": "failure_remove",
                "user_id": 0,
                "timestamp": (new Date()).getTime() / 1000
            }
        ];
        
        return applyFilter(dummy, filter);
    }
}

export default Reporting;

