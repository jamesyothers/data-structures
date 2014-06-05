var makeStack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = {};
  someInstance.storage = {};
  someInstance.sizer = 0;
  _.extend(someInstance, stackMethods);

  return someInstance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.storage[this.sizer] = value;
  this.sizer++;
};

stackMethods.pop = function() {
  if(this.sizer > 0) {
    this.sizer--;
    var copy = this.storage[this.sizer];
    delete this.storage[this.sizer];
  }
  return copy;
};

stackMethods.size = function() {
  return this.sizer;
};

