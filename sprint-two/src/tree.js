var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  //  property, an array containing a number of subtrees
  newTree.children = undefined;
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

//  method, takes any value, sets that as the target of a node, and adds that node as a child of the tree
treeMethods.addChild = function(value){
  if(this.children === undefined){
    this.children = [];
  }
  var childTree = makeTree(value);
  this.children.push(childTree);
};

// method, takes any input and returns a boolean reflecting whether it can be found as the value of the target node or any descendant node
treeMethods.contains = function(target){

  var searchChild = function(childTree){
    if(childTree.value === target){
      return true;
    } else {
      if(childTree.children){
        for(var i = 0; i < childTree.children.length; i++){
          if (searchChild(childTree.children[i])) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return searchChild(this);
};

// var tree1 = makeTree(1);
// var tree2 = tree.addChild(2);

// tree1.addChild(3);
// tree2.addChild(2.1);

// tree1.contains(2.1) == tree2.contains(2.1);
/*
 * Complexity: What is the time complexity of the above functions?
 */
