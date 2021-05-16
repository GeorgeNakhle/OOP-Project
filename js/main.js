console.log('Hello from main.js');

function correctURL(){
    const path = window.location.pathname;
    const currentUserID = getCookie('currentUserID');
    const onLoginOrRegister = path.startsWith('/login') || path.startsWith('/register');
    const loggedIn = currentUserID != null;
    const URLContainsID = location.search.includes('currentUserID');

    if (!loggedIn){
        if (!onLoginOrRegister){
            window.location = '/login';
        }
        else{
            saveCurrentPage();
        }
    }
    else{
        if (onLoginOrRegister){
            window.location = '/home';
        }
        else if (!URLContainsID){
            window.location = `${path}?currentUserID=${currentUserID}`;
        }
        else{
            saveCurrentPage();
        }
    }
}

correctURL();

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

function saveCurrentPage(){
    let history = getCookie('history');
    if (!history) history = [];

    const loc = window.location.pathname + window.location.search
    if (history[history.length - 1] != loc){
        history.push(loc);
        setCookie('history', history);
    }
}

function restorePreviousPage(){
    const history = getCookie('history');
    if (history){
        if (history.length > 1){
            const curr = history.pop();
            const prev = history[history.length - 1];
            setCookie('history', history);

            if (prev){
                window.location = prev;
            }
            else{
                window.location = '/';
            }
        }
    }
}

console.log(getCookie('history'));

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