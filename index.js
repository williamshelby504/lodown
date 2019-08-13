'use strict';
/**
 * identity: Returns a value unchanged.
 * 
 * @param {Datatype} value: the value to return.
 * 
 * @return {Datatype} the same as inputed value.
 */
function identity(value){
    return value;
}

module.exports.identity = identity;
/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, func){
    for (let i = 0; i < collection.length; i++){
        if (typeOf(collection) === 'array'){
            func(collection[i], i, collection);
        }
    }
    for (let key in collection){
        if (typeOf(collection) === 'object'){
            func(collection[key], key, collection);
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
 function typeOf(value){
    if (value === null){
        return 'null';
    } else if (Array.isArray(value)){
        return 'array';
    } else {
        return typeof value;
    }
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
    let newArr = [];
    if (typeOf(array) !== 'array') {
        return newArr;
    }
    else if (typeOf(number) !== 'number') {
        return array[0];
    }
    else {
        if (number > array.length) {
            number = array.length;
        }
        for (var i = 0; i < number; i++) {
            newArr.push(array[i]);
        }
    }
    return newArr;
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


    let newArr = [];
    if (typeOf(array) !== 'array') {
        return newArr;
    }
    else if (typeOf(number) !== 'number' || number === undefined) {
        return array[array.length - 1];
    }
    else {
        if (number > array.length) {
            number = array.length;
        }
        for (var i = array.length - number; i < array.length; i++) {
            newArr.push(array[i]);
        }
        return newArr;
    }
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
function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
        return -1;
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
function unique(array){
    let newArr = [];
    for (let i = 0; i < array.length; i++){
    if (newArr.indexOf(array[i]) === -1){
      newArr.push((array[i]));
  }
        
    }return newArr;
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
function filter(array, func) {
    let newArr = [];
    // use each to get all the elements
    each(array, function(element, i, array){
        if (func(element, i, array) === true){
            newArr.push(element);
        }
        
    });
    
    
    
    return newArr;
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
function reject(array, func){
    let newArr = [];
    // use each to get all the elements
    each(array, function(element, i, array){
        if (func(element, i, array) === false){
            newArr.push(element);
        }
        
    });
    
    
    
    return newArr;

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
function partition(array, func) {
    let newArr = [];
    let arr = [];
    let arrAll = [];
    // use each to get all the elements
    each(array, function(element, i, array) {
        if (func(element, i, array) === false) {
            newArr.push(element);
            return newArr;
        } 
        
            if (func(element, i, array) === true) {
                arr.push(element);
                return arr;
            }

    });
    arrAll.push(arr, newArr);
    return arrAll;

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
function map(collection, func){
    let newArr = [];
    each(collection, function(element, i, array) {
        newArr.push(func(element, i, array));
    });
    return newArr;
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
function pluck(array, property){
   var result = map(array, function(element, i, array) {
        return element[property];
    });
    return result;
};
module.exports.pluck = pluck;

/**
 * every: Designed to test if a collection of items all result in true. If one item produces a false, the entire result is false.
 * 
 * @param {Array or Object} collection: A given collection which can be an array or object to be searched over for elements as true or false.
 * @param {Function} action: The function to be applied to each item in the collection.
 * 
 * @return: Returns a boolean value.
 */
function every(collection, action){
   var bool = true;
   if(typeof action === 'function'){ 
       each(collection, function(ele, i, collection){
           if(!action(ele, i, collection)){ 
            bool = false;
           }
       });
   } else {
       each(collection, function(ele){
         if(!ele) {
             bool = false;
         }
       });
   }
   return bool;
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
function some(collection, func) {
    var bool = false;
    if (typeof func === 'function') {
        each(collection, function(ele, i, collection) {
            if (func(ele, i, collection)) {
                bool = true ;
            }
        });
    }
    else {
        each(collection, function(ele) {
            if (ele) {
                bool = true;
            }
        });
    }
    return bool;
}
module.exports.some = some;


/**
 * reduce: Designed to loop over all elements in a collection, add its value to the previous value, and return a single value.
 * 
 * @param {Array or Object} array: The array is looped over.
 * @param {Function} action: The function that runs after the loop.
 * @param {Value} seed: The first value returned from the function.
 * 
 * @return: Returns the accumulated value at either the accumulator or the initial value in the collection.
 */
function reduce(array, func, seed) {
    let preResult;
    if (seed !== undefined) {
        preResult = seed;
        each(array, function(element, i, array) {
            preResult = func(preResult, element, i);
        });
    }
    else if (seed === undefined) {
preResult = array[0];
each(array.slice(1), function(element, i, array) {
    preResult = func(preResult, element, i + 1);
});
    }
    return preResult;

}
module.exports.reduce = reduce;
 

/**
 * extend: Designed to copy all the properties from one object to another.
 * 
 * @param {Object} object1 and object2: Consists of at least two objects. The first object receives the copied properties from the second object.
 * 
 * @return: Returns the object with newly duplicated properties.
 */
function extend(object, ...object2){
    each(object2, function(element, i, array) {
        each(element, function(value, key, obj) {
            object[key] = value;
        });
    });return object;
}
module.exports.extend = extend;