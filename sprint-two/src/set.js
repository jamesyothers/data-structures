var makeSet = function(){
  //prototypal instantiation
  //creates a new object 'set' with a prototype object
  var set = Object.create(setPrototype);
  //private or psuedo-private variables are preceeded by an underscore
  //this is our storage object
  set._storage = undefined;
  return set;
};

var setPrototype = {};

setPrototype.add = function(item){
  //if there is no storage object create one
  if(this._storage === undefined){
    this._storage = {};
  }
  //regardless, put the passed item into the storage object
  //choose a key equal to its value for simplicity
  this._storage[item] = item;
};

setPrototype.contains = function(item){
  if(this._storage !== undefined){
    //returns boolean, key in object format
    return item in this._storage;
  }
  //otherwise return false if storage is undefined
  return false;

};

setPrototype.remove = function(item){
  //delete the storage property with the passed item
  delete this._storage[item];
  //if there the object is empty, set the storage element to undefined 
  //like instantiation 
  if(Object.keys(this._storage).length === 0){
    this._storage = undefined;
  }

};

/*
 * Complexity: What is the time complexity of the above functions?
 */
