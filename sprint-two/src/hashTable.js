var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
};

HashTable.prototype.insert = function(key, value){
  var i = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(i) === undefined) {
    this._storage.set(i, [key, value]);
  }else{
    var index = this._storage.get(i);
    if (Array.isArray(index[0])) {
      // if there is a nested array at index
      index.push([key, value]);
      this._storage.set(i, index);
    }else {
      // if index is only a key, value pair
      var formerValue = index;
      index = [];
      index.push(formerValue);
      index.push([key, value]);
      this._storage.set(i, index);
    }
  }

};

HashTable.prototype.retrieve = function(key){
  var i = getIndexBelowMaxForKey(key, this._limit);
  var index = this._storage.get(i);

  if(index === null) {
    return null;
  } else if (Array.isArray(index[0])){
    for(var i=0; i<index.length; i++) {
      if (index[i][0] === key) {
        return index[i][1];
      }
    }
    return null;
  }else{
    return index[1];
  }
};

HashTable.prototype.remove = function(key){
  var i = getIndexBelowMaxForKey(key, this._limit);
  this._storage.set(i, null);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
