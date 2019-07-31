'use strict';

// YOU KNOW WHAT TO DO //


/** _.identity
returns a value unchenged
*/
 function identity(value){
    return value;
};

module.exports.identity = identity;


//typeOf 
/*
-takes any value
-test value to get the type of value back as a string
-
*/
function typeOf(value){
    //create an if to test value parameter
    if (value === null){
        return 'null';
    } else if (Array.isArray(value)){
        return 'array';
    } else {
        return typeof value;
    }
};

module.exports.typeOf = typeOf;


/* _.first returns the first element of an array
 Arguments:
  1) An array
  2) A number
*/
function first(array, number) {
    //i created my newArr to save my results
    let newArr = [];
    //i tested my parameters
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
        //I loop through my number parameter and push my array into my newArr
        for (var i = 0; i < number; i++) {
            newArr.push(array[i]);
        }
    }
    return newArr;
};

module.exports.first = first;



/** _.last returns the last element of an array.
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the last element in <array>.
*   3) Otherwise, return the last <number> items of <array>
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
        //last is similar to first but in last's loop im still iterating foward and starting from a different position 
        for (var i = array.length - number; i < array.length; i++) {
            newArr.push(array[i]);
        }
        return newArr;
    }
};

module.exports.last = last;


/** _.indexOf returns an array in which the value can be found
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrance of <value>
*   2) Return -1 if <value> is not in <array>
*/
function indexOf(array, value) {
    //i loop through my array and test if my array at each iteration equals my value
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    // else i return -1
        return -1;
};

module.exports.indexOf = indexOf;



/** _.contains returns true if value is in the list
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
*/
//all i do is test if my array includes the value
function contains(array, value){
return (array.includes(value) ? true : false);
};

module.exports.contains = contains;


/** _.each test if a collection is an object or array
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
*/
function each(collection, func){
    //i test for an array and call my function
    for (let i = 0; i < collection.length; i++){
        if (typeOf(collection) === 'array'){
            func(collection[i], i, collection);
        }
    }
    //i test for an object and call my function again
    for (let key in collection){
        if (typeOf(collection) === 'object'){
            func(collection[key], key, collection);
        }
    }
};

module.exports.each = each;




/** _.unique returns an array with no duplicates
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
*/
function unique(array){
    //create a new array
    let newArr = [];
    //loop through array
    for (let i = 0; i < array.length; i++){
        //testing the elements in the array
    if (newArr.indexOf(array[i]) === -1){
      newArr.push((array[i]));
  }
        //return new array
    }return newArr;
};

module.exports.unique = unique;



/** _.filter looks through 
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Edge Cases:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
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
};


module.exports.filter = filter;




/** _.reject
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter(), you must use _.filter() in your implementation
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
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

};

module.exports.reject = reject;



/** _.partition
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Edge Cases:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/
function partition(array, func) {
    let newArr = [];
    let arr = [];
    let arrAll = [];
    // use each to get all the elements
    each(array, function(element, i, array) {
        //if the function call is false I push my element in my first array
        if (func(element, i, array) === false) {
            newArr.push(element);
            return newArr;
        } 
        //if function is true i push it in the 2nd array i created
            if (func(element, i, array) === true) {
                arr.push(element);
                return arr;
            }

    });
    // after they both are pushed i push both arrays into my third array and return it 
    arrAll.push(arr, newArr);
    return arrAll;

};

module.exports.partition = partition;


/** _.map
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) call <function> for each element in <collection> passing the arguments:
*        if <collection> is an array:
*            the element, it's index, <collection>
*        if <collection> is an object:
*            the value, it's key, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/
function map(collection, func){
    // first i create an array to save my result in 
    let newArr = [];
    // i perform the each on my collection parameter
    each(collection, function(element, i, array) {
        //inside my each function i push the func call
        newArr.push(func(element, i, array));
    });
    return newArr;
};

module.exports.map = map;


/** _.pluck
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/
function pluck(array, property){
    // i performed map on my array because it creates an array for me and test if my array is an array
   var result = map(array, function(element, i, array) {
       //this is when i access my element to get the property
        return element[property];
    });
    return result;
};

module.exports.pluck = pluck;

/** _.every
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
*   2) If the return value of calling <function> for every element is true, return true
*   3) If even one of them returns false, return false
*   4) If <function> is not provided, return true if every element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/
function every(collection, action){
    // first i assign a variable to a boolean
   var bool = true;
   // i tested if my function(action) is a function
   if(typeof action === 'function'){ 
       //and if it passes i perform each on my collection
       each(collection, function(ele, i, collection){
           //within each i test if action is not a function
           if(!action(ele, i, collection)){ 
               //if it passes i reassign bool to false
            bool = false;
           }
       });
   } else {
       //else i just test if there is no element 
       each(collection, function(ele){
         if(!ele) {
             bool = false;
         }
       });
   }
   return bool;
};

module.exports.every = every;



/** _.some
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*       if <collection> is an array:
*        current element, it's index, <collection>
*       if <collection> is an object:
*        current value, current key, <collection>
*   2) If the return value of calling <function> is true for at least one element, return true
*   3) If it is false for all elements, return false
*   4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/
//some is the oppisite of every, so i just flipped all the booleans
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
};

module.exports.some = some;



/** _.reduce
* Arguments:
*   1) An array
*   2) A function
*   3) A seed
* Objectives:
*   1) Call <function> for every element in <collection> passing the arguments:
*         previous result, element, index
*   2) Use the return value of <function> as the "previous result"
*      for the next iteration
*   3) On the very first iteration, use <seed> as the "previous result"
*   4) If no <seed> was given, use the first element/value of <collection> as <seed> and continue to the next element
*   5) After the last iteration, return the return value of the final <function> call
* Edge Cases:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(previousSum, currentValue, currentIndex){ return previousSum + currentValue }, 0) -> 6
*/
function reduce(array, func, seed) {
    //first i create a variable with no value, so it'll return undefined
    let preResult;
    // then i test if seed is not undefined
    if (seed !== undefined) {
        //if it passes i assign preResult to my seed and run each on my array and reassign preResult to my func call with the preResult inside
        preResult = seed;
        each(array, function(element, i, array) {
            preResult = func(preResult, element, i);
        });
    }
    // else if test seed is undefined i assign preResult to the front my array and perform each on my array and slice it to create another array
    else if (seed === undefined) {
preResult = array[0];
each(array.slice(1), function(element, i, array) {
    preResult = func(preResult, element, i + 1);
});
    }
    return preResult;

};

module.exports.reduce = reduce;



/** _.extend
* Arguments:
*   1) An Object
*   2) An Object
*   ...Possibly more objects
* Objectives:
*   1) Copy properties from <object 2> to <object 1>
*   2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*   3) Return the update <object 1>
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/
function extend(object, ...objectArr){
    // run each on my object(s) and run another each on the outer each
    each(objectArr, function(element, i, array) {
        each(element, function(value, key, obj) {
            //i assign the value of object to value
            object[key] = value;
        });
    });return object;
};

module.exports.extend = extend;
/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    // i create loops and test if collection is a array and the same for thre object
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
