const loggin = document.querySelector('.loggin');
const loggout = document.querySelector('.loggout');
loggout.style.display = 'none';
const title = document.querySelector('.title');
const header = document.querySelector('.header');
const lastRide = document.querySelector('.last-ride');

loggin.addEventListener('click', () =>{
    window.location.href = 'https://www.strava.com/oauth/authorize?client_id=51577&response_type=code&redirect_uri=http://localhost:5500&approval_prompt=auto&scope=profile:read_all,activity:read';
});

loggout.addEventListener('click', () =>{
    window.location.href = '/';
});

const addImgProfil = (linkImg) => {
    const img = document.createElement('img');
    img.src= linkImg;
    header.appendChild(img);
    console.log(img);
 }

 const updateActivitesUI = (activities) => {
     activities.forEach( activite => {
        const html = `<li>distance: ${(activite.distance/1000).toFixed(2)} km Sport : ${activite.type}</li>`;
        lastRide.innerHTML += html;
     });
 }

const updateUI = (athlete, scopeEnable) => {

    console.log(athlete);
    console.log('Welcome on the UI', athlete.athlete.username);
    addImgProfil(athlete.athlete.profile);
    loggin.style.display = 'none';
    loggout.style.display = 'block';
    title.innerHTML = `${athlete.athlete.firstname} ${athlete.athlete.lastname}`;

    getAthleteStats(athlete.athlete.id, athlete.access_token)
        .then( res => console.log('Stats athlete' , res))
        .catch( err => console.log(err));

    if (scopeEnable){
        getActivities( athlete.access_token)
            .then(activities => updateActivitesUI(activities))
            .catch(err => console.log(err));
        }
    else {
        lastRide.innerHTML = '<p>Vous devez autoriser la lecture des données de vos activités pour voir vos stats.</p>'
    }
}

