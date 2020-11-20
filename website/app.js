/* Global Variables */

const API_Key = '03fb412ad30c6ec80bd8950956fe02c9';
const base_URL = 'http://api.openweathermap.org/data/2.5/Weather?zip=';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* event listener */
 const generateBtn = document.getElementById('generate');

 generateBtn.addEventListener('click', performAction);

function performAction(e) {
    // select the input feelings to include in POST
    const feelings = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    // get the API data
    getWeather(base_URL, zipCode , API_Key)
    
    .then( (data ) => {
        postData('/add', { 
            temp: data.main.temp ,
            date: newDate ,
            content: feelings });
    
            updateUI();
        });
     
};

/*  GET Web API Data*/
const getWeather = async (base_URL, zip, Key) => {
    const response = await fetch(`${base_URL} ${zip}&APPID=${Key}&units=imperial`);
    console.log(response);

    try {
        const data = await response.json();

        return data;
    } 
    catch (error) {
        console.log("error", error);
    }
}

/*  GET Project Data */
const getData = async (url = '') => {
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json();
        return allData;
        console.log(allData);
    }
    catch (error) {
        console.log("error", error);

    }
}


/* Function to POST data */
const postData = async (url = '', data = {}) =>{

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

/* Update UI */
const updateUI= async () =>{
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        const gettingData = allData[allData.length - 1];
        document.getElementById('date').innerHTML = 'Date: ' + gettingData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + gettingData.temp;
        document.getElementById('content').innerHTML = 'Feelings: ' + gettingData.content;
    } catch (error) {
        console.log("error", error);
    }
}
