import ApiFilterGroup from "./ApiFilterGroup";
import ApiFilter from "./ApiFilter";

export interface Pipe {
    id: number;
    name: string;
    length: number;
    dateCreated: number; //unix timestamp
    pressure: number;
    startPosition: {
        lat: number;
        lng: number;
    };
    status: string;
}

class PipeApi {
    static GetPipes(filter: ApiFilter|ApiFilterGroup, page: number, itemsPerPage: number) {
        // todo
    }
}


export default PipeApi;
