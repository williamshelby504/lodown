'use strict';


/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;


/**
 * typeOf: Returns the type of value as a string.
 * 
 * @param {Value} value: Any value given as the argument.
 *
 * @return: Returns true if it is an array, otherwise false.
 */
function typeOf(value) {
    if(Array.isArray(value)) return "array";
    if(value === null) return "null";
    else return typeof value;
}
module.exports.typeOf = typeOf;


/**
 * first: Designed to find the first element(s) of an array.
 * 
 * @param {Array} array: The given array of elements.
 * @param {Number} number: The number given will return that many elements starting from the beginning of the array. If n is used, one number will be returned.
 * 
 * @return: Returns the first element(s) of an array.
 */
function first(array, number) {
    if(!Array.isArray(array) || number < 0) return [];
    else if(typeof number !== "number" || number === undefined) return array[0];
    else return array.slice(0, number);
}
module.exports.first = first;
 
 
/**
* last: Designed to find the last element(s) of an array.
* 
* @param {Array} array: The given array of elements.
* @param {Number} number: The number given will return that many elements starting from the end of the array. If n is used, one number will be returned.
* 
* @return: Returns the last element(s) of an array.
*/
function last(array, number) {
    if(!Array.isArray(array) || number < 0) return [];
    else if(typeof number !== "number" || number === undefined) return array[array.length -1];
    else return array.slice(-number);
}
module.exports.last = last;


/**
 * indexOf: Designed to find the index of a value at its first occurrence.
 * 
 * @param {Array} array: The array to be looped over.
 * @param {Number} number: The number used to determine the index.
 * 
 * @return: Returns index of the matched value, otherwise -1.
 */
function indexOf(array, number) {
    var result = -1;
    each(array, function(item, index) {
        if (item === number && result === -1) {
            result = index;
        }
    });
    return result;
}
module.exports.indexOf = indexOf;
 
 
/**
 * contains: Determines if the given value exists in the array.
 * 
 * @param {Array} array: The given array to search.
 * @param {Value} value: The provided element to search for.
 * 
 * @return: Returns true if the value is found, otherwise false.
 */
function contains(array, value) {
    return (array.includes(value) ? true : false);
}
module.exports.contains = contains;
 
 
/**
 * unique: Determines if any duplicates exist in a given array by using === (strictly equals) for testing.
 * 
 * @param {Array} array: The given array to weed out duplicates.
 * 
 * @return: Returns a duplicate free version of the original array.
 */
function unique(array) {
    let uniqueArray = [];
    each(array, function(item) {
        if(indexOf(uniqueArray, item) === -1) {
            uniqueArray.push(item);
        }
    });
    return uniqueArray;
}
module.exports.unique = unique;


/**
 * filter: Designed to iterate over a collection and tests if elements return truthy.
 * 
 * @param {Array} array: The given array to search through.
 * @param {Function} action: The function looking at each element, it's index, and the array.
 * 
 * @return: Returns a new array of items that returned true.
 */
function filter(array, action) {
    let filterArray = [];
    each(array, function(value, index, collection) {
        if (action(value, index, collection)) {
            filterArray.push(value);
        }
    });
    return filterArray;
}
module.exports.filter = filter;


/**
 * reject: Designed to iterate over a collection and tests if elements return falsy.
 * 
 * @param {Array} array: The given array to search through.
 * @param {Function} action: The function looking at each element, it's index, and the array.
 * 
 * @return: Returns a new array of items that returned false.
 */
function reject(array, action) {
    let filterArray = [];
    each(array, function(value, index, collection) {
        if (!action(value, index, collection)) {
            filterArray.push(value);
        }
    });
    return filterArray;
}
module.exports.reject = reject;
 

/**
 * partition: Combines both filter and reject to produce both a group of true items and false items.
 * 
 * @param {Array} array: The given array to search through.
 * @param {Function} action: The function looking at each element, it's index, and the array.
 * 
 * @return: Returns a new array of two sub-arrays. One has items that passed as true while the other has items that passed as false.
 */
function partition(array, action) {
    const filterArray = filter(array, function(value, index, collection) {
        return action(value, index, collection);
    });
    const rejectArray = reject(array, function(value, index, collection) {
        return action(value, index, collection);
    });
    return [filterArray, rejectArray];
}
module.exports.partition = partition;
 

/**
 * map: Designed to call the function for each element in a collection that passes the argument.
 * 
 * @param {Array or Object} collection: An array or object given to search through.
 * @param {Function} action: The function to be applied to each value in the collection.
 * 
 * @return: Returns a new array of modified items.
 */
function map(collection, action) {
    const mapArray = [];
    each(collection, function(element, index, collection) {
        mapArray.push(action(element, index, collection));
    });
    return mapArray;
}
module.exports.map = map;
 

/**
 * pluck: Designed to work with the map function. It extracts a list of property values.
 * 
 * @param {Array} array: The given array to search over for values with a certain property.
 * @param {Property} property: Given as an argument, property is the attribute of a value to search for.
 * 
 * @return: Returns a new array of property values.
 */
function pluck(array, property) {
    return map(array, function(property, key, collection){
        return property.name;
    });
} 
module.exports.pluck = pluck;

/**
 * every: Designed to test if a collection of items all result in true. If one item produces a false, the entire result is false.
 * 
 * @param {Array or Object} collection: A given collection which can be an array or object to be searched over for elements as true or false.
 * @param {Function} action: The function to be applied to each item in the collection.
 * 
 * @return: Returns a boolean value.
 */
function every(collection, action) {
    const everyArray = [];
    if (action !== undefined) {
        each(collection, function(value, index, collection) {
            let every = action(value, index, collection);
            everyArray.push(every);
        });
        if (everyArray.includes(false)) {
            return false;
        }
        return true;
    }
    let container = true;
    each(collection, function(value, index, collection) {
        if (!value) {
            container = false;
        }
    });
    return container;
}
module.exports.every = every;


/**
 * some: Designed to return true if any of the values in the collection return true. Once a true is returned, the loop ends.
 * 
 * @param {Array or Object} collection: A given collection which can be an array or object to be searched over for elements as true or false.
 * @param {Function} action: The function to be applied to each item in the collection.
 * 
 * @return: Returns a boolean value.
 */
function some(collection, action) {
    const someArray = [];
    if (action !== undefined) {
        each(collection, function(value, index, collection) {
            let some = action(value, index, collection);
            someArray.push(some);
        });
        if (someArray.includes(true)) {
            return true;
        }
        return false;
    }
    let container = true;
    each(collection, function(value, index, collection) {
        if (!value) {
            container = false;
        }
    });
    return container;
}
module.exports.some = some;


/**
 * reduce: Designed to loop over all elements in a collection, add its value to the previous value, and return a single value.
 * 
 * @param {Array or Object} collection: The collection looped over.
 * @param {Function} action: The function that runs after the loop.
 * @param {Value} seed: The first value returned from the function.
 * 
 * @return: Returns the accumulated value at either the accumulator or the initial value in the collection.
 */
function reduce(collection, action, seed) {
    for (var i = 0; i < collection.length; i++) {
        if (seed === undefined) {
            seed = collection[i];
        } else {
            seed = action(seed, collection[i], i, collection);
        }
    } return seed;
}
module.exports.reduce = reduce;
 

/**
 * extend: Designed to copy all the properties from one object to another.
 * 
 * @param {Object} object1 and object2: Consists of at least two objects. The first object receives the copied properties from the second object.
 * 
 * @return: Returns the object with newly duplicated properties.
 */
function extend(object1, object2) {
    for (var i = 1; i < arguments.length; i++)
        for (var key in arguments[i])
            if (arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}
module.exports.extend = extend;