let button = document.createElement("button");
button.innerHTML = "<i class='material-icons white-text'>search</i>";
button.className = "btn blue";

//search input
let input = document.createElement("INPUT");
input.className = "search";

input.setAttribute("type", "text");
input.setAttribute("onfocus", 'this.value=""');

let outerDiv = document.getElementById("all");
let inputDiv = document.getElementById("input");
inputDiv.appendChild(input);
inputDiv.appendChild(button);

button.onclick = () => { 
    function deleteChild() {
        let child = outerDiv.lastElementChild;
        while (child) {
            outerDiv.removeChild(child);
            child = outerDiv.lastElementChild;
        }
    }
    deleteChild();

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${
        input.value
    }&appid=3f3e70a22276142872e9c96aff44db87`).then((response) => {
        if (response.ok) {
            return response.json();
        } 
    }).then((data) => {
        let lon = data.city.coord.lon;
        let lat = data.city.coord.lat;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
      exclude=winds&units=metric&appid=3f3e70a22276142872e9c96aff44db87`).then((res) => res.json()).then((results) => { // all the data for 8 days
            let allTheDays = results.daily;
            allTheDays.map((day, index) => {
                day.weather.map((item) => {
                    console.log(index);

                    let iconcode = item.icon;
                    let image = document.createElement("img");
                    image.className = "image";

                    // setting image value(icon)
                    image.src = "http://openweathermap.org/img/w/" + iconcode + ".png";

                    // weather description
                    let description = document.createElement("div");
                    description.innerHTML = item.description;

                    // temparature value
                    let temp = document.createElement("p");
                    temp.innerHTML = "Temperature:" + day.temp.day + "<sup>o</sup>";

                    // min value
                    let min = document.createElement("p");
                    min.innerHTML = "Min:" + day.temp.min + "<sup>o</sup>";

                    // min value
                    let max = document.createElement("p");
                    max.innerHTML = "Max:" + day.temp.max + "<sup>o</sup>";

                    // rain
                    let precip = document.createElement("p");
                    let rain;

                    // setting the value of rain, sometimes it is underfined
                    switch (true) {
                        case day.rain > 0: rain = day.rain + " mm";
                            break;
                        default: rain = "no rain";
                    }
                    precip.innerHTML = "Precipitation:" + rain;

                    // humidity
                    
                    // wind speed and direction
                    let wind = document.createElement("p");
                    let speed = day.wind_speed * 3.6;

                    let deg = day.wind_deg;
                    let direction;

                    // setting the wind directions
                    switch (true) {
                        case deg >= 348.75 && deg < 11.25: direction = "N";
                            break;
                        case deg >= 11.25 && deg < 33.75: direction = "NNE";
                            break;
                        case deg >= 33.75 && deg < 56.25: direction = "NE";
                            break;
                        case deg >= 56.25 && deg < 78.75: direction = "ENE";
                            break;
                        case deg >= 78.75 && deg < 101.25: direction = "E";
                            break;
                        case deg >= 101.25 && deg < 123.75: direction = "ESE";
                            break;
                        case deg >= 123.75 && deg < 146.25: direction = "SE";
                            break;
                        case deg >= 146.25 && deg < 168.75: direction = "SSE";
                            break;
                        case deg >= 168.75 && deg < 191.25: direction = "S";
                            break;
                        case deg >= 191.25 && deg < 213.75: direction = "SSW";
                            break;
                        case deg >= 213.75 && deg < 236.25: direction = "SW";
                            break;
                        case deg >= 236.25 && deg < 258.75: direction = "WSW";
                            break;
                        case deg >= 258.75 && deg < 281.25: direction = "W";
                            break;
                        case deg >= 281.25 && deg < 303.75: direction = "WNW";
                            break;
                        case deg >= 303.75 && deg < 326.25: direction = "NW";
                            break;
                        case deg >= 326.25 && deg < 348.75: direction = "NNW";
                            break;
                        default: direction = "not found";
                    }

                    wind.innerHTML = "Wind:" + ` ${direction} ${
                        speed.toFixed(2)
                    } KPH`;

                    //cards
                    let divCard = document.createElement("div");
                    let divImage = document.createElement("div");
                    let divContent = document.createElement("div");
                    let city = document.createElement("p");
                    let date = document.createElement("p");

                    // giv
                    divCard.className = "card";
                    divImage.className = "card-image";
                    divContent.className = "card-content";
                    city.className = " city ";
                    date.className = "date";
                    description.className = "info";

                    // getting the date
                    const d = new Date();

                    // Month
                    let month = d.getMonth() + 1;

                    // Day
                    let dayy = d.getDay();

                    // Year
                    let year = d.getFullYear();

                    // giving values
                    city.innerHTML = input.value;

                    date.innerHTML = `${
                        dayy === 31 ? dayy : index + dayy
                    }/${month}/${year}`;

                    // append the elements
                    divImage.appendChild(city);
                    divImage.appendChild(date);
                    divImage.appendChild(image);
                    divContent.appendChild(description);
                    divContent.appendChild(temp);
                    divContent.appendChild(min);
                    divContent.appendChild(max);
                    divContent.appendChild(precip);
                    divContent.appendChild(wind);

                    divCard.appendChild(divImage);
                    divCard.appendChild(divContent);
                    outerDiv.appendChild(divCard);
                });
                console.log(results);
            });
        });
    }).catch((error) => {
        console.log("somethong is not correct");

        // creating not found message
        let errorMsg = document.createElement("h4");
        let notFoundImage = document.createElement("img");

        // giving class names
        errorMsg.className = "notFound white-text";
        notFoundImage.className = "notFoundImage";

        // giving values
        errorMsg.innerHTML = "Opps City not found...";

        notFoundImage.src = "https://www.artzstudio.com/wp-content/uploads/2020/05/404-error-not-found-page-lost-1024x788.png";
        notFoundImage.setAttribute("width", "90%");
        notFoundImage.setAttribute("height", "600px");

        // appending the elements
        document.getElementById("all").appendChild(errorMsg);
        outerDiv.appendChild(notFoundImage);
    });
};


h3.className = "supported center white-text hide-on-med-and-down";
par.className = "created white-text";
logo.className = "lifeChoices";

// setting values
par.innerHTML = 'Made with <i class="material-icons">favorite</i> By Philani Sithembiso Ndhlela ';

logo.src = "https://secureservercdn.net/184.168.47.225/cc4.564.myftpupload.com/wp-content/uploads/2016/05/Salesian-Life-Choices.png?time=1574693901";

logo.setAttribute("width", "0,auto");
logo.setAttribute("height", "100px");

link.setAttribute("target", "blank");
link.href = "https://www.lifechoices.co.za/academy";

h3.innerHTML = "Supported by";

