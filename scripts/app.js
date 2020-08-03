// Get the authorization 
const urlParams = new URLSearchParams(window.location.href);
const code = urlParams.get('code');
const scope = urlParams.get('scope');

const clientId = '51577';
const clientSecret = '55b529553cdd14a1a87344b4ad1c80ced3fb784b';
const getToken = 'https://www.strava.com/api/v3/oauth/token';

const urlAPI = 'https://www.strava.com/api/v3/'



const getData = async () => {
    const response = await fetch(getToken +`?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const dataAthlete = await response.json(); //extract JSON from the http response
    return dataAthlete;
  }

if(code){
    getData()
        .then(athlete => { 
            console.log('Your are logged In', athlete.athlete.username);
            console.log('scope: ', scope);
            const scopeEnable = scope.includes('activity:read');
            console.log(scopeEnable);
            updateUI(athlete, scopeEnable);
        })
        .catch( err => console.log(err));
}
else{
    console.log('Your are not connected');
}

const getAthleteStats = async (id, token) => {
    const response = await fetch(urlAPI + `/athletes/${id}/stats`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    const athleteStats = await response.json();
    return athleteStats;
}

// activity

const getActivities = async (token) => {
    const response = await fetch(urlAPI + `/athlete/activities?per_page=10`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    const activities = await response.json();
    return activities;
}