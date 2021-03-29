const urlNextLaunch = "https://api.spacexdata.com/v3/launches/next";

async function fetchNextLaunch() {
    try {
        const response = await fetch(urlNextLaunch);
        const nextLaunch = await response.json();

        displayNextLaunch(nextLaunch);

    } catch (error) {
        document.location.href = "error.html";
        console.log(error);
    }
}

fetchNextLaunch();

function displayNextLaunch(nextLaunch) {
    console.log(nextLaunch);

    const nextLaunchContainer = document.querySelector(".next-launch-container, .launch-next-container");

    let html = "";

    let launchDetails = "There are no information yet";

    if (nextLaunch.details !== null) {
        launchDetails = nextLaunch.details;
    }

    html += `<div class="next-launch__details">
                <h3 class="heading heading--tertiary">
                    ${nextLaunch.mission_name}
                </h3>
                <p class="next-launch__date">
                    ${nextLaunch.launch_date_utc}
                </p>
                <a href="launches.html" class="btn btn--border">
                    See all launches
                </a>
            </div>

            <div class="launch-next__box">
                <div class="launch-next__details">
                    <div class="api-info__text">
                        <span>Rocket:</span> ${nextLaunch.rocket.rocket_name}
                    </div>
                    <div class="api-info__text">
                        <span>Launch site:</span> ${nextLaunch.launch_site.site_name} 
                    </div>
                    <div class="api-info__text">
                        <span>Manufacturer:</span> ${nextLaunch.rocket.second_stage.payloads[0].manufacturer} 
                    </div>
                    <div class="api-info__text">
                        <span>Nationality:</span> ${nextLaunch.rocket.second_stage.payloads[0].nationality} 
                    </div>
                    <div class="api-info__text">
                        <span>Payload type:</span> ${nextLaunch.rocket.second_stage.payloads[0].payload_type} 
                    </div>
                    <div class="api-info__text api-info__text--hidden">
                        <span>Details:</span> ${launchDetails}
                    </div>
                </div>
                
                <div class="next-launch__patch launches__patch">
                    <img src="${nextLaunch.links.mission_patch_small}" alt="Image of mission patch" class="mission-patch mission-patch--next">
                </div>
            </div>
            `;

    nextLaunchContainer.innerHTML = html;
}

