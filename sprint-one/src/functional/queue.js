var makeQueue = function(){
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var top = 0;
  var bottom = 0;
  // Implement the methods below

  someInstance.enqueue = function(value){
    storage[top] = value;
    top++;
  };

  someInstance.dequeue = function(){
    if (top - bottom > 0) {
      var copy = storage[bottom];
      delete storage[bottom];
      bottom++;
    }
    return copy;
  };

  someInstance.size = function(){
    return top - bottom;
  };

  return someInstance;
};
