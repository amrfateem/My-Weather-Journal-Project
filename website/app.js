// Global Variables
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const myAPIKey = '&appid=74d326e6b8f3299c58112a3758c76c3f&units=metric'; //Metric C*
const generate = document.getElementById('generate');
const desiredZipCode = document.getElementById('zip');
const feelingbox = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


//Generate button
generate.addEventListener('click', getWeather);

function getWeather(e) {
    e.preventDefault();
    const zipCode = desiredZipCode.value;
    const content = feelingbox.value;
    // Chain promise
    getZip(baseURL, zipCode, myAPIKey)
        .then((userData) => {
            postData('/append', {
                temp: userData.main.temp,
                content,
                date: newDate
            })
        })
        .then(() => {
            updateUI()
        });

    // TO clear input upon submitting
    removeText();
}

//fetching data using zip code, default is US (tried using EG data but the site seems to not respond to it)
const getZip = async (baseURL, zipCode, myAPIKey) => {
    const res = await fetch('http://' + baseURL + zipCode + myAPIKey);
    try {
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log(`error is: ${error}`)
    }
}

//Routing the data from Client-side to Server-side

const postData = async (url = '', data = {}) => {
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
        console.log(`error is: ${error}`)
    }
}

//updating the content
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML = allData.date;
    } catch (err) {
        console.log(`error is: ${err}`);
    }
}