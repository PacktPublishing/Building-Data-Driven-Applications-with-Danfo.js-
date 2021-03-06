let syncarray = ["1", "2", "2", "4", "5"]


function addA(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            syncarray.forEach((value, index) => {
                syncarray[index] = value + "+A";
            })
            resolve()
        }, 1000);
    })
}

function addB(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            syncarray.forEach((value, index) => {
                syncarray[index] = value + "+B";
            })
            resolve()
        }, 2000);
    })
}
async function runPromises(){ 
    await addA() 
    await  addB() 
    console.log(syncarray); 
  } 
  
runPromises() 
//output: [ '1+A+B', '2+A+B', '2+A+B', '4+A+B', '5+A+B' ] 