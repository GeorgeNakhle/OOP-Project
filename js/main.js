console.log('Hello from main.js');

const socket = io();

/**
 * Send a POST request to the API
 * @param {string} endpoint - The name of the API endpoint
 * @param {object} data - The POST body, needs to be able to be turned into JSON
 * @returns {Promise} resolves with text response, or rejects with error
 */
function fetchAPI(endpoint, data){
    return new Promise((resolve, reject) => {
        const settings = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        fetch(`/api/${endpoint}`, settings).then(res => {
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
    window.name = '{}';
}

/**
 * Sets a new cookie
 * @param {string} key - The key for the cookie object
 * @param {object} value - The value for the cookie object
 */
function setCookie(key, value){
    if (window.name == '') window.name = '{}';
    
    let obj = JSON.parse(window.name);

    obj[key] = value;
    window.name = JSON.stringify(obj);
}

/**
 * Gets a cookie
 * @param {string} key - The key for the cookie object
 * @returns {*} the value of cookie if set, else undefined
 */
function getCookie(key){
    if (window.name == '') window.name = '{}';

    return JSON.parse(window.name)[key];
}