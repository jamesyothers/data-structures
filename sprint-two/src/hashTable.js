var HashTable = function(){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
  //keep track of size for resizing functionality
  this._size = 0;
};

HashTable.prototype.insert = function(k, v){
  //utilize the hashing function to get index
  var index = getIndexBelowMaxForKey(k, this._limit);
  //get a bucket at a given location
  //every location at an index with a k/v pair will have a bucket
  //more than one k/v pair at a bucket location will have a tuples
  var bucket = this._storage.get(index);
  //set flag for the need to update a value based on the same key input
  var replace = false;
  
  //if there is currently not a bucket at this index
  //make an empty array
  //buckets will ultimately be arrays within an array
  //the buckets themselves will also be in the _storage array
  if(!bucket) {
    bucket = [];
    //we can set the _storage array early with bucket and mutate bucket to our liking for the remainder of the function because bucket is a pointer to the value in the _storage element at a particular index
    this._storage.set(index, bucket);
    //if bucket already exists
  } else {
    //iterate through the tuples in the given bucket
    for (var i = 0; i < bucket.length; i++) {
      //represent a new tuple as we iterate through each
      var tuple = bucket[i];
      //if the first element of the tuple contains the key we are trying to insert, we overwrite it
      if (tuple[0] === k) {
        //overwrite the value with the new value
        tuple[1] = v;
        //now our replace flag is set to true
        replace = true;
      }
    }
  }
  
  //if we haven't already replaced a k/v pair we must insert a new one
  if(!replace) {
    //the bucket is already an array within an array so we can push another array in
    bucket.push([k, v]);
    //increment the size for the resize functionality
    this._size++;
    //resize to double if the storage array contains 75% of its containers worth of k/v pairs
    //multiple tuples at a single bucket count towards this
    if(this._size>0.75 * this._limit) {
       this._resize(this._limit * 2);
     }
  }

};

HashTable.prototype.retrieve = function(k){
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);

  //if there exists a value at this bucket
  if(bucket !== undefined) {
    //iterate through the tuples if they exist
    //if only one key/value pair, will iterate once
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      if (tuple[0] === k) {
        //return the value at the given key 
        return tuple[1];
      }
    }
  }
  //return null not undefined because undefined means we do not know something
  //we know we were asked to retreive a value at a bucket that was empty
  return null;

};

HashTable.prototype.remove = function(k){
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);

  //same logic as retreive
  if(bucket !== undefined) {
    //will only iterate once for a single bucket item
    for (var i = 0; i < bucket.length; i++) {
      var tuple = bucket[i];
      if (tuple[0] === k) {
        //this will remove the tuple from the bucket
        bucket.splice(i, 1);
        //decrement for resize functionality
        this._size--;
       //resize below threshold
       //not at threshold b/c don't want to go below 1?
       if(this._size < 0.25 * this._limit) {
        this._resize(this._limit/2);
       }
        //return the value of the key inputted
        return tuple[1];
      }
    }

  }
  return null;

};

HashTable.prototype._resize = function(newSize){ 
  //keep a copy of the original storage array
  var oldStorage = this._storage;
  //now create a new storage array
  this._storage = makeLimitedArray(newSize);
  //change the size property of our hash table
  this._limit = newSize;
  //reset size to zero 
  this._size = 0;

  //3 ways to correctly set context within the .each function
  //1 2 var context = this; //one way to solve this/bind problem
  
  //iterate over the old storage array
  //use the helpper .each function given in hashTableHelpers.js
  oldStorage.each( function(bucket) {
    //if nothing in bucket, skip it
    if(bucket === undefined) {return;}
    //iterate over all tuples in a bucket
    //if only one k/v pair, will run once only
    for (var j = 0; j < bucket.length; j++) {
     var tuple = bucket[j];
     //utilize our insert function
     //it has all the functionality we want to insert k/v pairs into the hash table
     this.insert(tuple[0], tuple[1]);  //3
     //1 context.insert(tuple[0], tuple[1]);
     //2 another way: insert.call(context, tuple[0], tuple[1]);
    }
  }.bind(this));  //3 this is another way, pass in 'this' bound to _resize
                  //_resize is bound to 'this' in .insert/.remove
};

/*
 * Complexity: What is the time complexity of the above functions?
 */