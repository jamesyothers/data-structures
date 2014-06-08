//there is only one graph
var Graph = function(){
  //all nodes in a single graph reside in this object
  this.nodes = {};
};

// method that takes a new node and adds it to the graph
// for specs, newNode and toNode are strings
Graph.prototype.addNode = function(newNode, toNode){
  //create a new object representing the added node
  var node = {
    //value property includes connected objects
    value : newNode,
    edges : {}
  };

  //check if there is a single node in the graph
  if(Object.keys(this.nodes).length === 1){
    //convert the single object key to a string from {string}
    toNode = Object.keys(this.nodes).toString();
    //upon adding a node, add an edge between the nodes as well
    this.addEdge(newNode, toNode);
  }
  
  //add the new node to the node object property of the graph
  //use the new node's value as its key
  this.nodes[node.value] = node;
  //ensure original node passed with the new node
  //not this: newGraph.addNode(newNode);
  //this check will prevent trying to set edges when only one node passed in
  if(toNode !== undefined){
    //set edges object property for the new node, to include the already created node
    node.edges[toNode] = toNode;
    //set edges object property for the new node, to include the already created node
    this.nodes[toNode].edges[newNode] = newNode;
  }

};

// method that takes any node and returns a boolean reflecting whether it can be found in the graph
Graph.prototype.contains = function(target){
  //iterate over all the nodes in the single graph
  for(var key in this.nodes){
    //check for the target value on each graph node
    if(key === target){
      return true;
    }
  }
  return false;
};

// method that takes any node and removes it from the graph, if present. All edges connected to that Node are removed as well
Graph.prototype.removeNode = function(target){
  //iterate over graph's single node object
  for(var key in this.nodes){
    //check for a match
    if(key === target){
      //before deleting the node
      //we must delete edges of target node from all of its connected nodes
      //access the graph's node's object at the target's property this.nodes[target], then access its edges object .edges
      for(var key2 in this.nodes[target].edges){
        //when we find any of the target's values in a node's edges object we delete the edge referencing the target node
        delete this.nodes[target].edges[key2];
      }
      //now we can delte the node from the graph's nodes object
      delete this.nodes[target];
      break;
    }
  }
};

// method that returns a boolean reflecting whether or not two nodes are connected
Graph.prototype.getEdge = function(fromNode, toNode){
  //we only need to check if one of the nodes has the other node as a property in its edges object
  return Boolean(this.nodes[fromNode].edges[toNode]);
};

//method that creates a edge (connection) between two nodes if they both are present within the graph
Graph.prototype.addEdge = function(fromNode, toNode){
  //ensure both nodes are in the graph
  if(this.nodes[fromNode] !== undefined && this.nodes[toNode] !== undefined){
    //set each other's edges objects to include a property referencing the other node
    this.nodes[fromNode].edges[toNode] = toNode;
    this.nodes[toNode].edges[fromNode] = fromNode;
  }
};

// method that removes the connection between two nodes
Graph.prototype.removeEdge = function(fromNode, toNode){
  //if edge exists
  //only need to check one edge
  //the other is assumed to exists based on addedge function
  if(this.nodes[fromNode].edges[toNode]){
    //intermediate variable for simplicity
    //fromNode is now the fromNode object property of the graph's nodes object
    fromNode = this.nodes[fromNode];
    //same for toNode
    toNode = this.nodes[toNode];
    //delete the edges property represented by the other node
    delete fromNode.edges[toNode.value];
    delete toNode.edges[fromNode.value];
    //if fromNode has no edges delete it from the graph's node object
    //this delete's unconneted nodes
    if(Object.keys(fromNode.edges) < 1){
      delete this.nodes[fromNode.value];
    }
    //same for toNode
    if(Object.keys(toNode.edges) < 1){
      delete this.nodes[toNode.value];
    }

  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
