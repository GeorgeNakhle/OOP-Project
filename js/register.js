// Method to register new user
// Called by button from HTML
function onSubmit(){
    // Get fields
    const username = document.getElementById('username').value;
    const passwords = document.getElementsByClassName('password');

    // Check fields
    if (!username){
        alert('Enter a username!')
    }
    else if (!passwords[0].value || !passwords[1].value){
        alert('Enter a password!');
    }
    else if (passwords[0].value != passwords[1].value){
        alert('Passwords do not match!');
    }
    else{
        const password = passwords[0].value;

        // Call API to register
        fetchAPI('register', {username, password}).then(res => {
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