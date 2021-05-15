function doStuff(request) {
    return new Promise((resolve, reject) => {

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

        resolve({
            content: "this is some example content from the ChatList model",
            chats: chats
        })
    });
}



module.exports = { doStuff };