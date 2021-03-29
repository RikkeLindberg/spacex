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

    const upcomingLaunchesContainer = document.querySelector(".launches-container");

    let html = "";

    for (let i = 1; i < upcomingLaunches.length; i++) {
        let detailsValue = "There are no information yet";

        if (upcomingLaunches[i].details !== null) {
            detailsValue = upcomingLaunches[i].details;
        }

        html += `<div class="launches__box">
                    <div class="launches__details">
                        <div class="launches__heading heading">
                            <span>${upcomingLaunches[i].mission_name}</span>
                                ${upcomingLaunches[i].launch_date_utc}
                        </div>
                    </div>

                    <div class="launches__details--row">
                        <div class="launches__details">
                            <div class="api-info__text">
                                <span>Rocket:</span> ${upcomingLaunches[i].rocket.rocket_name}
                            </div>
                            <div class="api-info__text">
                                <span>Launch site:</span> ${upcomingLaunches[i].launch_site.site_name} 
                            </div>
                            <div class="api-info__text">
                                <span>Manufacturer:</span> ${upcomingLaunches[i].rocket.second_stage.payloads[0].manufacturer} 
                            </div>
                            <div class="api-info__text">
                                <span>Nationality:</span> ${upcomingLaunches[i].rocket.second_stage.payloads[0].nationality} 
                            </div>
                            <div class="api-info__text">
                                <span>Payload type:</span> ${upcomingLaunches[i].rocket.second_stage.payloads[0].payload_type} 
                            </div>
                            <div class="api-info__text api-info__text--hidden">
                                <span>Details:</span> ${detailsValue}
                            </div>
                        </div>
                        
                        <div class="launches__patch">
                            <img src="${upcomingLaunches[i].links.mission_patch_small}" alt="Image of mission patch" class="mission-patch">
                        </div> 
                    </div>
                </div>
        `;
    }

    upcomingLaunchesContainer.innerHTML = html;
}

//PAST LAUNCHES
function displayPastLaunches(pastLaunches) {
    console.log(pastLaunches);

    const pastLaunchesContainer = document.querySelector(".past-launches-container");

    let html = "";

    for (let i = pastLaunches.length - 1; i >= 0; i--) {

        let detailsValue = "There are no information yet";

        if (pastLaunches[i].details !== null) {
            detailsValue = pastLaunches[i].details;
        }

        html += `<div class="launches__box">
                    <div class="launches__details">
                        <div class="launches__heading heading">
                            <span>${pastLaunches[i].mission_name}</span>
                            ${pastLaunches[i].launch_date_utc}
                        </div>
                    </div>

                    <div class="launches__details--row">
                        <div class="launches__details">
                            <div class="api-info__text">
                                <span>Rocket:</span> ${pastLaunches[i].rocket.rocket_name}
                            </div>
                            <div class="api-info__text">
                                <span>Launch site:</span> ${pastLaunches[i].launch_site.site_name} 
                            </div>
                            <div class="api-info__text">
                                <span>Manufacturer:</span> ${pastLaunches[i].rocket.second_stage.payloads[0].manufacturer} 
                            </div>
                            <div class="api-info__text">
                                <span>Nationality:</span> ${pastLaunches[i].rocket.second_stage.payloads[0].nationality} 
                            </div>
                            <div class="api-info__text">
                                <span>Payload type:</span> ${pastLaunches[i].rocket.second_stage.payloads[0].payload_type} 
                            </div>
                            <div class="api-info__text api-info__text--hidden">
                                <span>Details:</span> ${detailsValue}
                            </div>
                        </div>
                        <div class="launches__patch">
                            <img src="${pastLaunches[i].links.mission_patch_small}" alt="Image of mission patch" class="mission-patch">
                        </div>
                    </div>
                    
                    <div class="api-info__links">
                        <a href="${pastLaunches[i].links.video_link}" target="_blank">Video &#8594</a>
                        <a href="${pastLaunches[i].links.wikipedia}" target="_blank">More info &#8594</a>
                    </div>  
                </div>
            `;
    }

    pastLaunchesContainer.innerHTML = html;
}