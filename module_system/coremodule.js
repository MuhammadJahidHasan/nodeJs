 
const os = require('os');
const fs = require('fs');
const Date = require('./event');

fs.writeFileSync('myFile','How are you friend?');

fs.readFile('myFile',(err,data)=>{

    //console.log(data.toString());

});

const date = new Date();

date.on('Today is friday',()=>{

     console.log('Today our school is off');

});

//console.log(os.cpus());



date.todayDate();
 