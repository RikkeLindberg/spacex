const urlUpcomingLaunches = "https://api.spacexdata.com/v3/launches/upcoming";
const urlPastLaunches = "https://api.spacexdata.com/v3/launches/past";

async function fetchLaunches() {
    try {
        //UPCOMING LAUNCHES
        const upcomingLaunchesResponse = await fetch(urlUpcomingLaunches);
        const upcomingLaunches = await upcomingLaunchesResponse.json();

        displayUpcomingLaunches(upcomingLaunches);

        //PAST LAUNCHES
        const pastLaunchesResponse = await fetch(urlPastLaunches);
        const pastLaunches = await pastLaunchesResponse.json();

        displayPastLaunches(pastLaunches);

    } catch (error) {
        document.location.href = "error.html";
        console.log(error);
    }
}

fetchLaunches();

//UPCOMING LAUNCHES
function displayUpcomingLaunches(upcomingLaunches) {
    console.log(upcomingLaunches);

    const upcomingLaunchesContainer = document.querySelector(".upcoming-launches");

    let html = "";

    for (let i = 1; i < upcomingLaunches.length; i++) {
        let detailsValue = "There are no information yet";
            if (upcomingLaunches[i].details !== null) {
                detailsValue = upcomingLaunches[i].details;
            }

        let missionPatch = "";
            if (upcomingLaunches[i].links.mission_patch === null) {
                missionPatch = "/images/spacex-693229_640.jpg";

            } else {
                missionPatch = upcomingLaunches[i].links.mission_patch;
            }

        const longDate = `${upcomingLaunches[i].launch_date_utc}`;
        const shortDate = longDate.slice(0, 10); 

        html += `<div class="card">
                    <div class="card-details">
                        <h3 class="heading heading--tertiary">
                            <span>${upcomingLaunches[i].mission_name}</span>
                        </h3>
                        <p>${shortDate}</p>
                    </div>

                    <div class="card-details--row">
                        <div class="card-info">
                            <p class="text">
                                <span>Rocket:</span> ${upcomingLaunches[i].rocket.rocket_name}
                            </p>
                            <p class="text">
                                <span>Launch site:</span> ${upcomingLaunches[i].launch_site.site_name} 
                            </p>
                            <p class="text">
                                <span>Manufacturer:</span> ${upcomingLaunches[i].rocket.second_stage.payloads[0].manufacturer} 
                            </p>
                            <p class="text">
                                <span>Nationality:</span> ${upcomingLaunches[i].rocket.second_stage.payloads[0].nationality} 
                            </p>
                            <p class="text">
                                <span>Payload type:</span> ${upcomingLaunches[i].rocket.second_stage.payloads[0].payload_type} 
                            </p>
                            <p class="text text--hidden">
                                <span>Details:</span> ${detailsValue}
                            </p>
                        </div>
                        <img src=${missionPatch} alt=${upcomingLaunches[i].mission_name} class="patch">
                    </div>
                </div>
        `;
    }

    upcomingLaunchesContainer.innerHTML = html;
}

//PAST LAUNCHES
function displayPastLaunches(pastLaunches) {
    console.log(pastLaunches);

    const pastLaunchesContainer = document.querySelector(".past-launches");

    let html = "";

    for (let i = pastLaunches.length - 1; i >= 0; i--) {

        let detailsValue = "There are no information yet";

        if (pastLaunches[i].details !== null) {
            detailsValue = pastLaunches[i].details;
        }

        let missionPatch = "";
            if (pastLaunches[i].links.mission_patch === null) {
                missionPatch = "/images/spacex-693229_640.jpg";

            } else {
                missionPatch = pastLaunches[i].links.mission_patch;
            }

        const longDate = `${pastLaunches[i].launch_date_utc}`;
        const shortDate = longDate.slice(0, 10); 

        html += `<div class="card">
                    <div class="card-details">
                        <h3 class="heading heading--tertiary">
                            <span>${pastLaunches[i].mission_name}</span>
                        </h3>
                        <p>${shortDate}</p>
                    </div>

                    <div class="card-details--row">
                        <div class="card-info">
                            <div class="text">
                                <span>Rocket:</span> ${pastLaunches[i].rocket.rocket_name}
                            </div>
                            <div class="text">
                                <span>Launch site:</span> ${pastLaunches[i].launch_site.site_name} 
                            </div>
                            <div class="text">
                                <span>Manufacturer:</span> ${pastLaunches[i].rocket.second_stage.payloads[0].manufacturer} 
                            </div>
                            <div class="text">
                                <span>Nationality:</span> ${pastLaunches[i].rocket.second_stage.payloads[0].nationality} 
                            </div>
                            <div class="text">
                                <span>Payload type:</span> ${pastLaunches[i].rocket.second_stage.payloads[0].payload_type} 
                            </div>
                            <div class="text text--hidden">
                                <span>Details:</span> ${detailsValue}
                            </div>
                        </div>
                        <div class="card-patch">
                            <img src=${missionPatch} alt=${pastLaunches[i].mission_name} class="patch">
                        </div>
                    </div>
                    
                    <div class="card-links">
                        <a href="${pastLaunches[i].links.video_link}" target="_blank">Video &#8594</a>
                        <a href="${pastLaunches[i].links.wikipedia}" target="_blank">More info &#8594</a>
                    </div>  
                </div>
            `;
    }

    pastLaunchesContainer.innerHTML = html;
}