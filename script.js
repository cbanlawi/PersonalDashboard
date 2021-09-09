const author = document.getElementById("author");
const cryptoTop = document.getElementById("crypto-top");
const cryptoBottom = document.getElementById("crypto-bottom");
const weather = document.getElementById("weather");
const time = document.getElementById("time");


// Unsplash Image
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=beach"
)
  .then(response => response.json())
  .then(data => {
    // console.log(data.urls.regular)
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    author.textContent = `Photo by: ${data.user.name}`;
  })
  .catch((error) => {
    // default background image and author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1540848893531-5eece9a5fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzEwNjUxNjg&ixlib=rb-1.2.1&q=80&w=1080)`;

    author.textContent = "Photo by: Marcel Schreiber";
  });


// Crypto Info
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then(response => response.json())
  .then(data => {
    cryptoTop.innerHTML = `
        <img src=${data.image.small}>
        <span id="crypto-name">${data.name}</span>
    `

    cryptoBottom.innerHTML = `
        <div>
            <i class="fas fa-bullseye"></i>
            <span>$ ${data.market_data.current_price.cad}</span>
        </div>
        <div>
        <i class="fas fa-arrow-up"></i>
            <span>$ ${data.market_data.high_24h.cad}</span>
        </div>
        <div>
        <i class="fas fa-arrow-down"></i>
            <span>$ ${data.market_data.low_24h.cad}</span>
        </div>
    `

    console.log(data.market_data.current_price.cad);
  })
  .catch((error) => {
    console.error("oh no! error!");
  });


// Weather
navigator.geolocation.getCurrentPosition(position => {
    // fetch(`api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=3853bfd17fea2eb49ab64c0a91403c1c`)
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw Error("Weather information not available")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            
            weather.innerHTML = `
                <img src=${iconUrl} id="weather-icon">
                <span id="temperature">${Math.round(data.main.temp)}°</span>
                <p id="feels-like">Feels like: ${Math.round(data.main.feels_like)}°</p>
                <p id="weather-city">${data.name}</p>    
            `
        })
        .catch(error => console.error(error))
})


// Current Time
function getTime() {
    const today = new Date();
    time.textContent = today.toLocaleTimeString("en-US", {timeStyle: "medium"})
}

setInterval(getTime, 1000);