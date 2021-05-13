function doStuff(request) {
    return new Promise((resolve, reject) => {
        let date1 = new Date(2021, 10, 21, 10, 5, 0);
        let date2 = new Date(2021, 10, 22, 10, 5, 0);
        let date3 = new Date(2021, 10, 22, 11, 15, 0);
        let date4 = new Date(2021, 10, 23, 10, 5, 0);

        let messages = [
            {
                contact: "John Smith",
                text: "Hello.",
                date: date1.toLocaleString()
            },
            {
                contact: "Barry Allan",
                text: "I am eating pasta.",
                date: date2.toLocaleString()
            },
            {
                contact: "Jordan Mun",
                text: "Not much you?",
                date: date3.toLocaleString()
            },
            {
                contact: "David King",
                text: "Doing the laundry.",
                date: date4.toLocaleString()
            },
            {
                contact: "Jordan Mun",
                text: "Not much you?",
                date: date3.toLocaleString()
            },
            {
                contact: "David King",
                text: "Doing the laundry.",
                date: date4.toLocaleString()
            },
            {
                contact: "Jordan Mun",
                text: "Not much you?",
                date: date3.toLocaleString()
            },
            {
                contact: "David King",
                text: "Doing the laundry.",
                date: date4.toLocaleString()
            },
            {
                contact: "David King",
                text: "Doing the laundry.",
                date: date4.toLocaleString()
            },
        ];

        resolve({
            content: "this is some example content from the Chat model",
            messages: messages
        })
    });
}



module.exports = { doStuff };