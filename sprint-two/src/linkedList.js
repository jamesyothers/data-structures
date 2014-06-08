//no storage element necessary
//remember the item on left always points to item on right in equation
var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    //create a new node
    var node = makeNode(value);
    //if head is null we know the list is empty
    if (this.head === null) {
      //set the head and tail to point to the new node
      this.head = node;
      this.tail = node;
    } else {
      //point the current tail to the new node
      this.tail.next = node;
      //set the tail pointer to the new node
      this.tail = node;
    }
  };

  list.removeHead = function(){
    //copy a reference to the head object so we don't lose track when we move the head reference
    var copy = this.head;
    //this means there is one item
    if (this.head === this.tail && this.head !== null) {
      //delete the object at the head property
      delete this.head;
      //the only item has been deleted
      //therefore the head and tail are set to null
      this.head = null;
      this.tail = null;
      //this means there are 2 or more items
    } else if(this.head !== this.tail) {
      //we can delete the head
      delete this.head;
      //we now point the head to where the original head was pointing
      this.head = copy.next;
    }
    //we return the value of the original head
    return copy.value;
  };

  list.contains = function(target){
    //start our search at a reference to the head of the linked list
    var index = this.head;
    //iterate over the entire list until you get to the tail which points to null
    while (index !== null) {
      //if we found the correct value
      if (index.value === target) {
        return true;
      } else {
        //otherwise move pointer to next item in linked list
        index = index.next;
      }
    }
    //if we did not find the target value
    return false;
  };
  
  //in functional pattern must return the object
  return list;
};

//function that makes new nodes
var makeNode = function(value){
  var node = {};
  node.value = value;
  //the pointer property defaults to null
  //like the tail
  node.next = null;
  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


