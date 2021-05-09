function doStuff(request){
    return new Promise((resolve, reject) => {
        resolve({
            header: "Example!",
            title: "example",
            content: "this is the example page",
        })
    });
}



module.exports = {doStuff};