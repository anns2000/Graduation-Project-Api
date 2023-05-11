const Queue = require("../utils/Stl.queue");
const PriorityQueue = require("../utils/stl.prioityQueue");

let ticketQueue = new PriorityQueue();
let UserQueue = new Queue();

module.exports.addTicket=(task)=>{

     ticketQueue.add(task);
}
module.exports.cancelTicket=(id)=>{

   return ticketQueue.searchAndRemove(id);
}
module.exports.print=()=>{
   return ticketQueue.heap ?? [];
}



