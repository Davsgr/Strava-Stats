const loggin = document.querySelector('.loggin');
const loggout = document.querySelector('.loggout');
loggout.style.display = 'none';
const stats = document.querySelector('.stats');
stats.style.display='none';
const title = document.querySelector('.title');
const header = document.querySelector('.header');
const statsTitle = document.querySelector('.stats-title');
const lastRide = document.querySelector('.last-ride');
const error = document.querySelector('.error');

const totalBike = document.querySelector('.total-bike');
const bikeBar = document.querySelector('.bike');
const totalRun = document.querySelector('.total-run');
const runBar = document.querySelector('.run');
const totalSwim = document.querySelector('.total-swim');
const swimBar = document.querySelector('.swim');

loggin.addEventListener('click', () =>{
    window.location.href = 'https://www.strava.com/oauth/authorize?client_id=51577&response_type=code&redirect_uri=http://localhost:5500&approval_prompt=auto&scope=profile:read_all,activity:read';
});

loggout.addEventListener('click', () =>{
    window.location.href = '/';
});

const addImgProfil = (linkImg) => {
    const img = document.createElement('img');
    img.src= linkImg;
    header.insertBefore(img,title);
    console.log(img);
 }

 const updateActivitesUI = (activities) => {
     console.log(activities);
     stats.style.display='flex';
     let run = 0;
     let swim = 0;
     let bike = 0;
     activities.forEach( activite => {
        if (activite.type === 'Run'){
            const html = `<li>distance: &nbsp&nbsp&nbsp <span class="dist">${(activite.distance/1000).toFixed(2)} km</span>
                            Sport : <i class="fas fa-running"></i></li> 
                            ${dateFns.format(activite.start_date_local,'DD/MM/YYYY')}`;
            lastRide.innerHTML += html;
            ++run;
            runBar.style.width = run*200/10;
            totalRun.textContent = run;
        } else if (activite.type === 'Swim'){
            const html = `<li>distance: &nbsp&nbsp&nbsp <span class="dist">${(activite.distance/1000).toFixed(2)} km</span>
                            Sport : <i class="fas fa-swimmer"></i></li> 
                            ${dateFns.format(activite.start_date_local,'DD/MM/YYYY')}`;
            lastRide.innerHTML += html;
            ++swim;
            swimBar.style.width = swim*200/10;
            totalSwim.textContent = swim;
        } else if (activite.type === 'Ride'){
            const html = `<li>distance: &nbsp&nbsp&nbsp <span class="dist">${(activite.distance/1000).toFixed(2)} km</span>
                            Sport : <i class="fas fa-biking"></i></li> 
                            ${dateFns.format(activite.start_date_local,'DD/MM/YYYY')}`;
            lastRide.innerHTML += html;
            ++bike;
            bikeBar.style.width = bike*200/10;
            totalBike.textContent = bike;
            console.log(bike);
        } else {
            const html = `<li>distance: &nbsp&nbsp&nbsp <span class="dist">${(activite.distance/1000).toFixed(2)} km</span>
                            Sport : <i class="fas fa-biking"></i></li> 
                            ${dateFns.format(activite.start_date_local,'DD/MM/YYYY')}`;
            lastRide.innerHTML += html;
        }
        
     });
 }

const updateUI = (athlete, scopeEnable) => {

    console.log(athlete);
    console.log('Welcome on the UI', athlete.athlete.username);
    addImgProfil(athlete.athlete.profile);
    loggin.style.display = 'none';
    loggout.style.display = 'block';
    title.innerHTML = `<h1>${athlete.athlete.firstname} ${athlete.athlete.lastname}</h1>
                        <h2>${athlete.athlete.country}</h2>`;

    getAthleteStats(athlete.athlete.id, athlete.access_token)
        .then( res => console.log('Stats athlete' , res))
        .catch( err => console.log(err));

    if (scopeEnable){
        getActivities( athlete.access_token)
            .then(activities => updateActivitesUI(activities))
            .catch(err => console.log(err));
        }
    else {
        error.innerHTML = '<p>Vous devez autoriser la lecture des données de vos activités pour voir vos stats.</p>'
    }
}

