var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var node = makeNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  };

  list.removeHead = function(){
    var copy = this.head;
    if (this.head === this.tail && this.head !== null) {
      delete this.head;
      this.head = null;
      this.tail = null;
    } else if(this.head !== this.tail) {
      delete this.head;
      this.head = copy.next;
    }
    return copy.value;
  };

  list.contains = function(target){
    var index = this.head;
    while (index !== null) {
      if (index.value === target) {
        return true;
      } else {
        index = index.next;
      }
    }
    return false;
  };

  return list;
};

var makeNode = function(value){
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


