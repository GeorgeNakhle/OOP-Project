function doStuff(request){
    return new Promise((resolve, reject) => {
        resolve({
            content: "this is some example content from the CreateChat model",
        })
    });
}



module.exports = {doStuff};