
const EventEmitter = require('events');

class Date extends EventEmitter{

 todayDate(){

      console.log('Today is friday');

      setTimeout(()=>{

        this.emit('Today is friday');

      },2000);


}

}

module.exports = Date;