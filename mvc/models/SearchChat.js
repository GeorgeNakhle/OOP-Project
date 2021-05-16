const searchForChat = require(`${process.env.api}/searchForChat`).model

function doStuff(request) {
    const searchString = request.query.searchString;
    return new Promise((resolve, reject) => {
    

    searchForChat(searchString).then(res => {
        if(res.success){
            let chats = res.chats;
            resolve({
                content: "this is some example content from the SearchChat model",
                chats: chats,
                searched: searchString,
            })
        } else {
            resolve({
                error: "No chats could be found"
            })
        }
    });

    
    // let date = new Date(2021, 10, 21, 10, 5, 0);

    // let chats = [
    //     {
    //         name: "sssssssssssssssssssss",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },
    //     {
    //         name: "Group Chat",
    //         date: date.toLocaleString()
    //     },

    // ];
    });
}



module.exports = { doStuff };