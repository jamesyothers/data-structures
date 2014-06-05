var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this._top = 0;
  this._bottom = 0;
  this._storage = {};
};

Queue.prototype.enqueue = function(value) {
  this._storage[this._top] = value;
  this._top++;
};

Queue.prototype.dequeue = function() {
  if(this._top - this._bottom > 0){
    var copy = this._storage[this._bottom];
    delete this._storage[this._bottom];
    this._bottom++;
  }
  return copy;
};

Queue.prototype.size = function() {
  return this._top - this._bottom;
};


