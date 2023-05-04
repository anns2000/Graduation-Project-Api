class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item) {
      this.items.push(item);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
    }
  
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[0];
    }
  
    size() {
      return this.items.length;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    searchAndRemove(item) {
      const index = this.items.findIndex(element => element === item);
      if (index === -1) {
        return null;  // Item not found in queue
      }
      const deletedItem = this.items[index];
      this.items.splice(index, 1);
      return deletedItem;
    }
  }
  
  module.exports=Queue