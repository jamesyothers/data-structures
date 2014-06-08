//every node is its own tree
var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  //property, an array containing a number of subtrees
  newTree.children = undefined;
  //functional with shared properties instantiation
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

//  method, takes any value, sets that as the target of a node, and adds that node as a child of the tree
treeMethods.addChild = function(value){
  //if there are currently no children for this tree
  //make an empty array to push into
  if(this.children === undefined){
    this.children = [];
  }
  //make a new child tree with the maker function
  var childTree = makeTree(value);
  //push in the the child tree object to the children array for its parent
  this.children.push(childTree);
};

// method, takes any input and returns a boolean reflecting whether it can be found as the value of the target node or any descendant node
treeMethods.contains = function(target){
  //set up recursive function
  var searchChild = function(childTree){
    if(childTree.value === target){
      //this is the base case
      return true;
    } else {
      if(childTree.children){
        for(var i = 0; i < childTree.children.length; i++){
          //we want the recursion to stop when returns true
          //do not want to keep going
          //this is how we do this
          if (searchChild(childTree.children[i])) {
            return true;
          }
        }
      }
    }
    //will get here if never returns true
    return false;
  };
  
  //pass in 'this' as the starting point for the search
  //we start at the tree object that calls the function
  //will this only work on the head node?  should work on all maybe (?)
  return searchChild(this);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
