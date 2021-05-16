console.log('Hello from main.js');

// Correct the URL if user is somewhere they shouldnt be
function correctURL(){
    // Get the current URI path
    const path = window.location.pathname;
    // Bool if the user is current on the login or register page
    const onLoginOrRegister = path.startsWith('/login') || path.startsWith('/register');
    // Bool if the user is currently logged in
    const loggedIn = getCookie('currentUserID') != null;

    // If not logged in and not on the login/register page
    // Redirect to login page
    if (!loggedIn){
        if (!onLoginOrRegister){
            window.location = '/login';
        }
    }
    else{
        // If logged in and on the login/register page
        // Redirect to home page
        if (onLoginOrRegister){
            window.location = '/home';
        }
    }
}

correctURL();

// Connect socket to server
const socket = io();

// Show error message if server sends an error event
socket.on('error', err => {
    alert(err.message);
})

/**
 * Send a POST request to the API
 * @param {string} endpoint - The name of the API endpoint
 * @param {object} data - The POST body, needs to be able to be turned into JSON
 * @returns {Promise} resolves with text response, or rejects with error
 */
function fetchAPI(endpoint, data){
    return new Promise((resolve, reject) => {
        // POST parameters
        const settings = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        // Call the API endpoint passing the POST parameters
        fetch(`/api/${endpoint}`, settings).then(res => {
            // If server handled the request without crashing, resolve with JSON object
            if (res.status == 200){
                res.json().then(resolve).catch(() => {
                    reject(new Error('Failed parsing response!'));
                });
            }
            else{
                reject(new Error('Unknown error!'));
            }
        });
    })
}

/**
 * Deletes local cookie
 */
function clearCookies(){
    // Set local storage to empty json array
    window.name = '{}';
}

/**
 * Sets a new cookie
 * @param {string} key - The key for the cookie object
 * @param {object} value - The value for the cookie object
 */
function setCookie(key, value){
    if (window.name == '') window.name = '{}';
    
    // Get entire object from cookies
    let obj = JSON.parse(window.name);

    // Add new key and value to object
    obj[key] = value;
    // Readd the cookie object to cookie
    window.name = JSON.stringify(obj);
}

/**
 * Gets a cookie
 * @param {string} key - The key for the cookie object
 * @returns {*} the value of cookie if set, else undefined
 */
function getCookie(key){
    if (window.name == '') window.name = '{}';

    // Get cookie object, parse JSON and return value of the key
    return JSON.parse(window.name)[key];
}