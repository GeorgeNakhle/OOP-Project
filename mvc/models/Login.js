function doStuff(request){
    return new Promise((resolve, reject) => {
        resolve({
            content: "this is some example content from the Login model",
        })
    });
}



module.exports = {doStuff};