import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import totalusers from "./dbusers.js";
import cors from "cors";
import Pusher from "pusher";
// const Messages =require("./dbMessages.js");
// const Pusher = require('pusher');
// const cors = require('cors');
// const dbConfig = require('./dbConfig.json');
//mongpass= WwkH5uCbs74C7XD
// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1320337",
    key: "1e42232b7d9062a61471",
    secret: "e942f5a25fab35697a61",
    cluster: "ap2",
    useTLS: true
});



app.use(express.json());
app.use(cors({ credentials: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

const connection_url = `mongodb+srv://admin:WwkH5uCbs74C7XD@cluster0.mpdjh.mongodb.net/whatsappdb?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    const usercollection = db.collection("users");

    changeStream.on('change', (change) => {
        // console.log('change: ', change);

        if (change.operationType === "update") {
            const req = change.updateDescription.updatedFields;
            // console.log('change: ', Object.keys(req)[0]);
            const messageDetails = change.updateDescription.updatedFields[Object.keys(req)[0]];
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
                username: messageDetails.username
            });
        }
        else if (change.operationType === "insert") {
            const req = change.fullDocument.allmessages
            const messageDetails = change.fullDocument.allmessages[Object.keys(req)[0]];
            if (messageDetails != undefined) {
                pusher.trigger("messages", "inserted", {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                    username: messageDetails.username
                });
            }
        }
        else {
            console.log("Error triggering Pusher");
        }
    })
})
app.get('/', (req, res) => res.status(200).send('Hello World'));

// app.get('/messages/sync', (req, res) => {
//     Messages.find((err, data) => {

//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(200).send(data)
//         }
//     })
// })
app.post('/messages/sync2', (req, res) => {
    const roomdetails = req.body;
    Messages.find(
        { userid: roomdetails.roomname }, { "allmessages": 1 }, { upsert: true }, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        })
})
app.post('/users/sync2', (req, res) => {
    const details = req.body;
    const ttt = totalusers.find((err, data) => {
    });
    totalusers.find({ useruid: { $ne: details.useruid } }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            data.sort(function (a, b) {
                return (a.username).localeCompare(b.username);
            });
            res.status(200).send(data)
        }
    })
})

// app.post('/messages/new', (req, res) => {
//     const dbMessage = req.body;

//     Messages.updateOne(dbMessage, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(201).send(data);
//         }
//     })
// })
app.post('/messages/new2', (req, res) => {
    const dbMessage = req.body;
    const mess = {
        "username": dbMessage.username,
        "message": dbMessage.message,
        "name": dbMessage.name,
        "timestamp": dbMessage.timestamp,
        "received": dbMessage.received,
    }
    Messages.findOneAndUpdate(
        { userid: dbMessage.roomname },
        { $push: { allmessages: mess } }, { upsert: true }, (err, data) => {
            if (err) {
                res.status(500).send(err);
                console.log("error")
            } else {
                res.status(201).send(data);
            }
        })
})
app.post("/create", (req, res) => {
    const userdetails = req.body;
    totalusers.findOneAndUpdate(
        { useruid: userdetails.useruid, },
        { username: userdetails.username, purl: userdetails.purl, lastseen: userdetails.lastseen }
        , { upsert: true }, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        })
});
// app.post("/lastseen", (req, res) => {
//     const userdetails = req.body;
//     console.log("userdetails ",userdetails.username)
//     totalusers.findOneAndUpdate(
//         { useruid: userdetails.username, },
//         { lastseen: userdetails.received }
//         , { upsert: true }, (err, data) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.status(201).send(data);
//             }
//         })
//     console.log("lastseen set to ", userdetails.received)
// });
// app.post("/getlastseen", (req, res) => {
//     const userdetails = req.body;

//     totalusers.find(
//         { useruid: userdetails.useruid, }, (err, data) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else {
//                 res.status(201).send(data);
//             }
//         })
// });
app.post("/createroom", (req, res) => {
    const roomdetails = req.body;
    Messages.findOneAndUpdate(
        { userid: roomdetails.roomname }, {}, { upsert: true }, (err, data) => {
            console.log("roomio ", roomdetails.roomname)
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        })
});
app.listen(port, () => console.log(`Listening on localhost:${port}`));