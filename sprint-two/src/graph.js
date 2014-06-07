var Graph = function(){
  this.nodes = {};
};

// method that takes a new node and adds it to the graph
Graph.prototype.addNode = function(newNode, toNode){
  var node = {
    value : newNode,
    edges : {}
  };
  if(Object.keys(this.nodes).length === 1){
    toNode = Object.keys(this.nodes).toString();
    this.addEdge(newNode, toNode);
  }
  this.nodes[node.value] = node;
  if(toNode !== undefined){
    node.edges[toNode] = toNode;
    this.nodes[toNode].edges[newNode] = newNode;
  }

};

// method that takes any node and returns a boolean reflecting whether it can be found in the graph
Graph.prototype.contains = function(target){
  for(var key in this.nodes){
    if(key === target){
      return true;
    }
  }
  return false;
};

// method that takes any node and removes it from the graph, if present. All edges connected to that Node are removed as well
Graph.prototype.removeNode = function(target){
  for(var key in this.nodes){
    if(key === target){
      for(var key in this.nodes[target].edges){
        delete this.nodes[target].edges[key];
      }
      delete this.nodes[target];
      break;
    }
  }
};

// method that returns a boolean reflecting whether or not two nodes are connected
Graph.prototype.getEdge = function(fromNode, toNode){
  if(this.nodes[fromNode].edges[toNode]){
    return true;
  }
  return false;
};

//method that creates a edge (connection) between two nodes if they both are present within the graph
Graph.prototype.addEdge = function(fromNode, toNode){
  if(this.nodes[fromNode] !== undefined && this.nodes[toNode] !== undefined){
    console.log(this.nodes[fromNode]);
    this.nodes[fromNode].edges[toNode] = toNode;
    this.nodes[toNode].edges[fromNode] = fromNode;
  }
};

// method that removes the connection between two nodes
Graph.prototype.removeEdge = function(fromNode, toNode){
  if(this.nodes[fromNode].edges[toNode]){
    fromNode = this.nodes[fromNode];
    toNode = this.nodes[toNode];
    delete fromNode.edges[toNode.value];
    delete toNode.edges[fromNode.value];
    if(Object.keys(fromNode.edges) < 1){
      delete this.nodes[fromNode.value];
    }
    if(Object.keys(toNode.edges) < 1){
      delete this.nodes[toNode.value];
    }

  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
