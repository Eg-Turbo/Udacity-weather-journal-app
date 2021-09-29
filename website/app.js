/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
console.log(d)
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const key = "dae2eae61d1bb14d404d209a79f5ac31" 
const generate = document.getElementById("generate")
generate.addEventListener("click", contactWithApi)
async function contactWithApi(){
    const zip = document.getElementById("zip").value
    const feeling = document.getElementById("feelings").value
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=metric`
    // check if the zip input and feeling input is empty
    if(zip == "" || feeling == ""){
        alert("please Enter zipcode and how are you feeling ")
    }else {
        // use try and catch to handle the error
    try{
        // get data from api by fetch method
    const data = await (await fetch(url)).json()
    const temp_max = data.main.temp_max;
    const temp_min = data.main.temp_min;
    const temp = data.main.temp;
    // post data to local server to store it
      await fetch("/postTempData",{
          method:"post",
          headers:{
              "content-Type":"application/json"
          },
          body: JSON.stringify({
            date:newDate ,
            maxtemp:temp_max,
            mintemp:temp_min,
            temp:temp,
            feelings:feeling
          })
     })
    //  get data from server side to client side
     const dataFromServar = await (await fetch("/getTempData")).json()
     updateUi(dataFromServar);
    }catch(error){
        console.log(error)
    }
}
}
// function to update ui to view data
async function updateUi (dataFromServar) {
    const date = document.getElementById("date")
    date.innerHTML=`Date : ${dataFromServar.date}`
    const temp = document.getElementById("temp")
    temp.innerHTML=`max Temperature = ${dataFromServar.maxtemp}&deg;C <br>min Temperature = ${dataFromServar.mintemp}&deg;C <br>Average Temperature = ${dataFromServar.temp}&deg;C`
    const content = document.getElementById("content")
    content.innerHTML=`Fellings = ${dataFromServar.feelings}`
}