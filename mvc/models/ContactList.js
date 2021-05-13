function doStuff(request){
    return new Promise((resolve, reject) => {
        resolve({
            content: "this is some example content from the ContactList model",
        })
    });
}



module.exports = {doStuff};