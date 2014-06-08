//every node is its own tree
var makeBinarySearchTree = function(value){
  //use prototypal instantiation method
  var newTree = Object.create(bSearchTreeMethods);
  newTree.left = undefined;
  newTree.right = undefined;
  newTree.value = value;
  return newTree;
};

var bSearchTreeMethods = {};

//  method, which accepts a value and places in the tree in the correct position.
//  no recursion necessary because tree is ordered
bSearchTreeMethods.insert = function(value){
  //create a new child tree
  var child = makeBinarySearchTree(value);
  //set a temp variable to point down our tree as we search
  var temp = this;
  //iterate until we have set the pointers value to the inputted value
  while(temp.value !== value){
    //if inputted value is greater than pointer's value
    if(value > temp.value) {
      //if the value to right is empty put the new child tree there
      if (temp.right === undefined) {
        temp.right = child;
        //point temp to the new tree so that escape the while loop
        temp = child;
        //if value to the right is occupied...
      } else {
        //...point to the right, to continue iteration
        temp = temp.right;
      }
    } else {
      //check for empty spot to left
      if (temp.left === undefined) {
        //if empty put in new tree
        temp.left = child;
        //update node to break out of while loop
        temp = child;
      } else {
        //update temp to continue iteration
        temp = temp.left;
      }
    }
  }
};

// method, which accepts a value and returns a boolean reflecting whether or not the value is contained in the tree.
// similar to insert in its logic, go down both sides
// no recursion necessary because tree is ordered
bSearchTreeMethods.contains = function(value){
  var temp = this;

  while(temp.value !== value){
    if(value > temp.value){
      // right
      if(temp.right === undefined){
        return false;
      } else {
        if(temp.right.value === value){
          return true;
        } else {
          temp = temp.right;
        }
      }
    }else {
      // left
      if(temp.left === undefined){
        return false;
      } else {
        if(temp.left.value === value){
          return true;
        } else {
          temp = temp.left;
        }
      }
    }
  }
};


// method, which accepts a callback and executes it on every value contained in the tree.
bSearchTreeMethods.depthFirstLog = function(callback){
  //setup recursive function
  var applyCallback = function(tree){
    callback(tree.value);
    if(tree.left !== undefined){
      //apply recursion for left children
      applyCallback(tree.left);
    }
    if(tree.right !== undefined){
      //apply recursion for right children
      applyCallback(tree.right);
    }
  };
  //pass in the object that called the function
  applyCallback(this);
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
