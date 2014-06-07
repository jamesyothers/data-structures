var Graph = function(value){
  // if(value === undefined){
  //   value = "null";
  // }
  this.value = value;
  this.nodes = {};
  this.nodeSize = 0;
};

// method that takes a new node and adds it to the graph
Graph.prototype.addNode = function(newNode, toNode){
  if(!this.nodes[newNode]){
    newNode = new Graph(newNode);
    this.nodes[newNode.value] = newNode;
    this.nodeSize++;
    newNode.nodes[this.value] = this;
    newNode.nodeSize++;
  }

};

// method that takes any node and returns a boolean reflecting whether it can be found in the graph
Graph.prototype.contains = function(target){

  var search = function(graph) {
    if(graph.value === target){
      return true;
    }
    for (var key in graph.nodes) {
      if (search(graph.nodes[key])) {
        return true;
      }
    }
    return false;
  };

  return search(this);
};

// method that takes any node and removes it from the graph, if present. All edges connected to that Node are removed as well
Graph.prototype.removeNode = function(target){

  var search = function(graph) {
    if(graph.value === target){
      return graph;
    }
    for (var key in graph.nodes) {
      return search(graph.nodes[key]);
    }
    return undefined;
  };

  var garbageNode = search(this);
  console.log(garbageNode);

  for(var key in garbageNode.nodes){
    var connectedNode = garbageNode.nodes[key];
    // remove from nodes
    // decrement node size
    // decrement edge size
    debugger;
    delete connectedNode.nodes[garbageNode.value];
    connectedNode.nodeSize--;
  }

};


//method that creates a edge (connection) between two nodes if they both are present within the graph
Graph.prototype.getEdge = function(fromNode, toNode){
};

// method that returns a boolean reflecting whether or not two nodes are connected
Graph.prototype.addEdge = function(fromNode, toNode){
};

// method that removes the connection between two nodes
Graph.prototype.removeEdge = function(fromNode, toNode){
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
