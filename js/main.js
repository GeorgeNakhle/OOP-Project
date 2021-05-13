console.log('Hello from main.js');

const socket = io();

/**
 * Send a POST request to the API
 * @param {string} endpoint - The name of the API endpoint
 * @param {object} data - The POST body, needs to be able to be turned into JSON
 * @returns {Promise} resolves with text response, or rejects with error
 */
function fetchAPI(endpoint, data){
    return fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(async res => {
        if (res.status != 200){
            throw new Error(await res.text());
        }
    });
}

/**
 * Deletes local cookie
 */
function deleteCookie(){
    window.name = '';
}

/**
 * 
 * @param {object} data - Object to store in local cookie; can be string, dict, list, whatever, just has to be able to be turned into a JSON
 */
function setCookie(data){
    window.name = JSON.stringify(data);
}

/**
 * Checks if the local cookie is set
 * @returns {bool} true if cookie is set to something, false otherwise
 */
function isCookieSet(){
    return window.name != '' && window.name != null && window.name != undefined;
}

/**
 * Gets the data stored in local cookie
 * @returns {object} the cookie data if cookie is set, otherwise throws an error
 */
function getCookie(){
    if (!isCookieSet) throw new Error('Unable to get cookie: cookie not set!');
    return JSON.parse(window.name);
}