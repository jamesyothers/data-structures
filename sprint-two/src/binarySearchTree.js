var makeBinarySearchTree = function(value){
  var newTree = Object.create(bSearchTreeMethods);
  newTree.left = undefined;
  newTree.right = undefined;
  newTree.value = value;
  return newTree;
};

var bSearchTreeMethods = {};

//  method, which accepts a value and places in the tree in the correct position.
bSearchTreeMethods.insert = function(value){
  var child = makeBinarySearchTree(value);
  var temp = this;
  while(temp.value !== value){
    if(child.value > temp.value) {
      if (temp.right === undefined) {
        temp.right = child;
        temp = child;
      } else {
        temp = temp.right;
      }
    } else {
      if (temp.left === undefined) {
        temp.left = child;
        temp = child;
      } else {
        temp = temp.left;
      }
    }
  }
};

// method, which accepts a value and returns a boolean reflecting whether or not the value is contained in the tree.
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
  var applyCallback = function(tree){
    callback(tree.value);
    if(tree.left !== undefined){
      applyCallback(tree.left);
    }
    if(tree.right !== undefined){
      applyCallback(tree.right);
    }
  };
  applyCallback(this);
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
