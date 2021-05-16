// Function to logout
// Called by button from HTML
function logout(){
    // Clear cookies and redirect to login page
    clearCookies();
    window.location = '/login';
}