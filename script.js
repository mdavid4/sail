document.getElementById("goButton").addEventListener("click", function(event) {
    event.preventDefault();
    /*const value = document.getElementById("input").value;
    if (value === "")
        return;
    console.log(value);*/
    let mayor;
    const url1 = "https://api.teleport.org/api/urban_areas/";
    let results = "";
    let advice = "";
    fetch(url1)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            let cities = json._links["ua:item"];
            let rand = Math.floor(Math.random() * cities.length);
            let city = cities[rand];
            //console.log(city)
            return city
        }).then(function(city) {
            fetch(city.href)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    mayor = json.mayor;
                    return json._links["ua:identifying-city"];
                }).then(function(identifyingCity) {
                    fetch(identifyingCity.href)
                        .then(function(response) {
                            return response.json();
                        }).then(function(json) {
                            /*console.log(json);
                            console.log(json.full_name);
                            console.log("population: " + json.population);
                            console.log("latitude: " + json.location.latlon.latitude);
                            console.log("longitude: " + json.location.latlon.longitude);
                            console.log("mayor: " + mayor);*/
                            results = "Today we visited" + "<br>";
                            results += "<strong>" + json.full_name + "</strong>";
                            results += "<br>" + "mayor: " + mayor;
                            results += "<br>" + "population: " + json.population;
                            results += "<br>" + "latitude: " + json.location.latlon.latitude +
                                ", longitude: " + json.location.latlon.longitude;
                        })
                        .then(function() {
                            document.getElementById("results").innerHTML = "<p>" + results + "</p>";
                            fetch("https://api.adviceslip.com/advice")
                                .then(function(response) {
                                    return response.json();
                                }).then(function(json) {
                                    advice = "Personal notes: " + json.slip.advice;
                                }).then(function() {
                                    document.getElementById("advice").innerHTML = "<p>" + advice + "</p>";
                                });
                        });
                });
        });

});