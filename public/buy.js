let buyButt = document.getElementById("buy");

function buyStock(event) {
    event.preventDefault();

    window.location.href="https://www.stash.com/investments/stocks/apple-aapl/";
} 

buyButt.addEventListener("click", buyStock);