function doStuff(request){
    return new Promise((resolve, reject) => {
        resolve({
            content: "this is some example content from the ContactInfo model",
        })
    });
}



module.exports = {doStuff};