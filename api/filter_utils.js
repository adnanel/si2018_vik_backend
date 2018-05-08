
/*
interface ApiFilter {
    type: string; // === 'filter', for easier (human readable) identification of this type
    operator: string;
    operandA: any;
    operandB: any;
}

interface ApiFilterGroup {
    type: string; // === 'group', for easier identification of this type
    operator: string; // 'and' or 'or'
    operands: (ApiFilter|ApiFilterGroup)[];
}
*/

export function makeCompareFun(operator) {
    switch ( operator ) {
        case '=':
            return function(a, b) { return a === b; };
        case '>=':
            return function(a, b) { return a >= b; };
        case '>':
            return function(a, b) { return a > b; };
        case '<':
            return function(a, b) { return a < b; };
        case '<=':
            return function(a, b) { return a <= b; };
        case '<>':
            return function(a, b) { return a !== b; };
        default:
            throw 'Unknown operator in filter! ' + operator;
    }
}

// literals are numbers, booleans etc (anything but a string) or strings escaped with "..." or '...'
export function isLiteral(op) {
    if ( typeof op !== 'string' ) {
        return true;
    }
    if ( op[0] === '\'' && op[op.length - 1] === '\'' ) {
        return true;
    }
    if ( op[0] === '"' && op[op.length - 1] === '"' ) {
        return true;
    }
    return false;
}

export function filterValid(entry, filter) {
    if ( filter.type === 'filter' ) {
        let compareFun = makeCompareFun(filter.operator);

        let opA = filter.operandA;
        let opB = filter.operandB;

        if ( !isLiteral(opA) ) {
            opA = entry[opA];
        } else if ( typeof opA === 'string' ) {
            opA = opA.substr(1, opA.length - 2);
        }

        if ( !isLiteral(opB) ) {
            opB = entry[opB];
        } else if ( typeof opB === 'string' ) {
            opB = opB.substr(1, opB.length - 2);
        }

        return compareFun(opA, opB);
    } else if ( filter.type === 'group' ) {
        for ( let subfilter of filter.operands ) {
            let isValid = filterValid(entry, subfilter);

            if ( !isValid && filter.operator.toUpperCase() === 'AND' ) {
                // short-circuit, if one is false then we don't need to check the rest.
                return false;
            } else if ( isValid && !filter.operator.toUpperCase() === 'OR' ) {
                // short-circuit, if one is true then we don't need to check the rest.
                return true;
            }
        }

        return true;
    } else {
        throw 'Invalid filter type! ' + filter.type;
    }
}

export function applyFilter(data, filter) {
    for ( let i = 0; i < data.length; ++ i ) {
        let entry = data[i];

        if ( !filterValid(entry, filter) ) {
            data.splice(i, 1);
            --i;
        }
    }
}

