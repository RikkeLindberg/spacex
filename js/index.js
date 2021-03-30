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
    const longDate = `${nextLaunch.launch_date_utc}`;
    const shortDate = longDate.slice(0,10);    

    const nextLaunchContainer = document.querySelector(".next-launch, .launch-next");

    let html = "";


    html += `<div class="card center">
                <h3 class="heading heading--tertiary">
                    ${nextLaunch.mission_name}
                </h3>
                <p class="date">
                    ${shortDate}
                </p>
                <img src="${nextLaunch.links.mission_patch_small}" alt="${nextLaunch.mission_name}" class="patch">
                <a href="launches.html" class="btn btn--border">
                    See all launches
                </a>
            </div>
            `;

    nextLaunchContainer.innerHTML = html;
}