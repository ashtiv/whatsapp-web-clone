import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {
  const [messages, setMessages] = useState([]);
  const [users, setusers] = useState([]);
  const [{ user,roomName }] = useStateValue();
  console.log("Database_URL", process.env.DATABASE_URL);
  // useEffect(() => {
  //   axios.post('/messages/sync2',{
  //     "roomname":roomName
  //   })
  //     .then(response => {
  //       setMessages(response.data);
  //     })
  // },[]);
  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.post('/messages/sync2',{
            "roomname":roomName
        })
        if(res.data.length===0){
          setMessages([{allmessages:[]}])
        }
        else setMessages(res.data);
      } catch (e) {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
      }
    };
    getWeather();
    
  }, [roomName]);
  useEffect(() => {
    const getWeather2 = async () => {
      try {
        const res = await axios.post('/users/sync2',{
          "useruid":user.email
        })
        setusers(res.data);
      } catch (e) {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
      }
    };
    console.log("user uid uid uid " ,user?.useruid)
    getWeather2();
    
  }, [user]);
  useEffect(() => {
    var pusher = new Pusher('1e42232b7d9062a61471', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      axios.post('/messages/sync2',{
        "roomname":roomName
      })
        .then(res => {
          if(res.data.length===0){
            setMessages([{allmessages:[]}])
          }
          else setMessages(res.data);
        })
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [roomName]);
  return (
    <div className="app">
        {!user ? (
          <Login/>
        ):(
          <div className="app__body">
              <Sidebar users={users}/>
              <Chat messages={messages}/>          
          </div>
        )}
        
    </div>
  );
}

export default App;
