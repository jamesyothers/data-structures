var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(key, value){
  var i = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(i) === undefined) {
    this._storage.set(i, value);
  }else{
    var obj = this._storage.get(i);
    // if object values are more than one
    if (typeof obj === 'object') {
      obj[key] = value;
      this._storage.set(i, obj);
    }else{
      obj = {};
      obj[key] = value;
      this._storage.set(i, obj);
    }
  }

};

HashTable.prototype.retrieve = function(key){
  var i = getIndexBelowMaxForKey(key, this._limit);
  var index = this._storage.get(i);
  console.log(index);
  if(typeof index === 'object'){
    return index[key];
  }else{
    return index;
  }
};

HashTable.prototype.remove = function(key){
  var i = getIndexBelowMaxForKey(key, this._limit);
  this._storage.set(i, null);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
