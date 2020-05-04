window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        
        const proxy = "https://cors-anywhere.herokuapp.com/";

        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)

                // shorthand for pulling out the tempature data in es6
                const {temperature, summary, icon} = data.currently;

                // set DOM Elements from API
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
                locationTimezone.textContent = data.timezone

                // formula for celsius
                let celsius = (temperature - 32) * (5 / 9)

                // set icon
                setIcons(icon, document.querySelector(".icon"))

                // change temperature to Celsius/fahrenheit
                temperatureSection.addEventListener('click', ()=> {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celsius.toFixed(3)
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature
                    }
                })
            });
      })
    } else {
        alert('Error defining location')
    }
    
    // animating rotating icons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color:"white"});
        // the code below replaces '-' with '_' just so it conforms with the skycons library
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])        
    }
  });