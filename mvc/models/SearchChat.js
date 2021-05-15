function doStuff(request) {

    let date = new Date(2021, 10, 21, 10, 5, 0);

    let chats = [
        {
            name: "sssssssssssssssssssss",
            date: date.toLocaleString()
        },
        {
            name: "Group",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },
        {
            name: "Group Chat",
            date: date.toLocaleString()
        },

    ];

    return new Promise((resolve, reject) => {
        resolve({
            content: "this is some example content from the SearchChat model",
            chats: chats
        })
    });
}



module.exports = { doStuff };