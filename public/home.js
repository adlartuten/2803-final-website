const res = require("express/lib/response");
const {json} = require("express/lib/response");

let searchbutt = document.getElementById("signupButton");
let pass = document.getElementById("search");
function signup(event) {
    event.preventDefault(); // needed for custom actions


        const ans = pass.value;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': '46696ad4camshc8033d999dc306cp1a477bjsn517c39425609'
            }
        };
        
        fetch('https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_WEEKLY&symbol=${ans}+&datatype=json', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        const {stock, info, series} = data;
        document.getElementById('stock1').textContent = stock;
        document.getElementById('content2').textContent = info;
        document.getElementById('content3').textContent = series;        

}
searchbutt.addEventListener("click", signup);
   






