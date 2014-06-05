var makeQueue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = Object.create(queueMethods);
  newQueue._storage = {};
  newQueue._top = 0;
  newQueue._bottom = 0;
  return newQueue;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this._storage[this._top] = value;
  this._top++;
};

queueMethods.dequeue = function() {
  if (this._top - this._bottom > 0) {
    var copy = this._storage[this._bottom];
    console.log(copy);
    delete this._storage[this._bottom];
    this._bottom++;
  }
  return copy;
};

queueMethods.size = function() {
  return this._top - this._bottom;
};
