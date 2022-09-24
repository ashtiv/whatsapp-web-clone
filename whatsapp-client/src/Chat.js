import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React from 'react';
import { serverTimestamp } from "firebase/firestore";
// import firebase from "firebase";
import "./Chat.css";
import axios from "./axios";
import { useState, useEffect,useRef } from "react";
import { useStateValue } from './StateProvider';
import ContactDetails from "./ContactDetails";
import Nullroom from "./Nullroom";
// import { actionTypes } from './reducer';

function Chat({ messages}) {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [{ user, roomName }, dispatch] = useStateValue();
    useEffect(() => {
        const getWeather = async () => {
            try {
                const res = await axios.post('/messages/sync2',{
                    "roomname":roomName
                  })
                messages = res.data;
            } catch (e) {
                console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
            }
        };
        getWeather();
    }, []);
    const sendMessage = async (e) => {
        e.preventDefault();
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        today=today.toISOString().slice(0, 10);
        await axios.post("/messages/new2", {
            "username": user.email,
            "message": input,
            "name": user.displayName,
            "timestamp": time,
            "received": time+" "+today,
            "roomname": roomName
        })
        setInput("");
    }
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };
    function lastline() {
        try {
            return (
                <div className="chat__body">
                    {messages[0]?.allmessages.map((message) => (
                        <p className={`chat__message ${ message.name == user.displayName && 'chat__receiver'}`}>
                            {message.message}
                            <span className="chat__timestamp">{message.timestamp}</span>
                            <AlwaysScrollToBottom />
                        </p>
                    ))}
                </div>
            )
        } catch (e) {
            return (<div className="chat__body"></div>)
        }
    }
    function chatdecider() {
        if (roomName == null) {
            return <Nullroom />
        }
        else {
            return (
                <div className="chat">
                    <ContactDetails messages={messages}/>
                    {lastline()}
                    <div className="chat__footer">
                        <InsertEmoticonIcon />
                        <form>
                            <input
                                placeholder="Type a message"
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)} />
                            <button onClick={sendMessage} type="submit">Send a message</button>
                        </form>
                        <MicIcon />
                    </div>
                </div>
            )
        }
    }
    return (
        chatdecider()
    )
}

export default Chat
