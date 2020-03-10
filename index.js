// What is a server? 
// A place in a computer that's listening for traffic, when it receives that traffic, it knows what to do with the traffic. (A place that's set up to receieve info from front end)



//EXAMPLE OF A HELLO ENDPOINT
// server.get('/hello', (req, res) => {
//     res.status(200).json({ hello: "web 27" })
// })

//POST TO HUBS
// server.post('/api/hubs', (req, res) => {
//     const hubInfo = req.body;
//     hubInfo.id = shortid.generate();
//     hubs.push(hubInfo);
//     res.status(201).json(hubInfo);
// })

//POST TO LESSONS
// server.post('/api/lessons', (req, res) => {
//     const lessonInfo = req.body;
//     lessonInfo.id = shortid.generate();
//     lessons.push(lessonInfo);
//     res.status(201).json(lessonInfo);
// })

//GET HUBS 
// server.get('/api/lessons', (req, res) => {
//     res.status(201).json({lessons})
// })


const express = require("express");
const shortid = require("shortid");
const server = express();

let users = [];

server.use(express.json());



// POST TO ARRAY OF USERS
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (!userInfo.name || !userInfo.bio){
        res.status(400);
        res.json({ error: "please provide name and bio"})
    } else if (userInfo.name || userInfo.bio) {
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo);
    } else {
        res.status(500).json({error: "There was an error while saving the user to the database"})
    }
})

// GET ARRAY OF USERS 
server.get('/api/users', (req, res) => {
    res.status(201).json({users})
    if(!users) {
        res.status(500)
        res.json({ error: "The users information could not be retrieved." })
    } else {
        res.status(200).json(users)
    }
})

// GET USER BY ID
server.get(`/api/users/:id`, (req, res) => {
    
    const { id } = req.params;
    const user = users.filter(user => id === user.id)

    if (user.length <= 0) { 
        res.status(404).json({ message: "the user with the specific ID doesn't exist" })
    } else if (user.length > 0) {
        res.status(200).json(user)
    } else {
        res.status(500).json({ error: "the user information could not be retrieved" })
    }
})

// DELETE A USER BY ID 
server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const user = users.filter(user => user.id);

    if (user.length <= 0) {
        res.status(400).json({ message: "The user with the specified ID does not exist" })
    } else if (users.length > 0) {
        res.status(200).json({ message: "user deleted successfully" })
        let newUsers = users.filter(user => id !== user.id)
        users = newUsers;
    } else {
        res.status(500).json({ message: "the user could not be removed" })
    }
})

// UPDATE A USER BY ID
// server.put(`/api/users/:id`, (req, res) => {
//     const { id } = req.params;
//     const userInfo = req.body;
//     const user = users.filter(user => id === user.id);

//     if (user.length <= 0) {
//         res.status(404).json({ message: "The user with the specified ID doesn't exist" })
//     } else if (userInfo.name && userInfo.bio){
//         if (!userInfo.name || !userInfo.bio) {
//         res.status(400).json({ error: "Please provide name and bio when updating" })
//     } else if (userInfo.body && userInfo.bio) {
        
//         }
//     }
// })








const PORT = 5000;

server.listen(PORT, () => {
    console.log(`\n ** API on http://localhost:${PORT} ** \n`);
})