// Function to login
// Called by button from HTML
function onSubmit(){
    // Get the fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check the fields
    if (!username){
        alert('Enter a username!')
    }
    else if (!password){
        alert('Enter a password!');
    }
    else{
        // Call API to login
        fetchAPI('login', {username, password}).then(res => {
            if (res.success){
                // If success, reset cookies and set current user data
                clearCookies();
                setCookie('currentUserID', res.currentUserID);
                setCookie('currentUsername', res.currentUsername);

                // Redirect to home page
                window.location = '/home';
            }
            else{
                console.log(res);
                alert(res.message);
            }
        }).catch(err => {
            console.error(err);
            alert(err.message);

            clearCookies();
        })
    }
}

// Button to go to register page
// Called by button from HTML
function goRegister(){
    window.location = '/register';
}