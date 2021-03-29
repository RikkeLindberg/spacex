const urlRockets = "https://api.spacexdata.com/v3/rockets";

async function fetchRockets() {
    try {
        const response = await fetch(urlRockets);
        const rockets = await response.json();

        displayRockets(rockets);

    } catch (error) {
        document.location.href = "error.html";
        console.log(error);
    } finally {
        const loader = document.querySelector(".lds-default");
        loader.style.display = "none";
    }
}

fetchRockets();

function displayRockets(rockets) {
    console.log(rockets);

    const rocketsContainer = document.querySelector(".rockets-container");

    let html = "";

    for (let i = 0; i < rockets.length; i++) {

        html += `<div class="rockets__details">
                    <img src="${rockets[i].flickr_images[0]}" alt="Photo of SpaceX rocket" class="rockets__image">
                    <h2 class="heading heading--rockets">
                        ${rockets[i].rocket_name}
                    </h2>
                    <div class="rockets__box">
                        <div class="api-info__text">
                            <span>Cost per launch:</span> ${rockets[i].cost_per_launch}
                        </div>
                        <div class="api-info__text">
                            <span>First flight:</span> ${rockets[i].first_flight}
                        </div>
                        <div class="api-info__text">
                            <span>Country:</span> ${rockets[i].country}
                        </div>
                        <div class="api-info__text">
                            <span>Height:</span> ${rockets[i].height.meters} m
                        </div>
                        <div class="api-info__text">
                            <span>Diameter:</span> ${rockets[i].diameter.meters} m
                        </div>
                        <div class="api-info__text">
                            <span>Mass:</span> ${rockets[i].mass.kg} kg
                        </div>
                        <div class="api-info__links">
                            <a href="${rockets[i].wikipedia}" target="_blank">More info &#8594</a>
                        </div> 
                    </div>
                </div >      
        `;
    }

    rocketsContainer.innerHTML = html;
}