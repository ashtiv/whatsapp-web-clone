import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import { useState, useEffect } from "react";
import axios from './axios';

function Sidebar({ users }) {
    const [{ user }] = useStateValue();
    const [changedusers, setchangedusers] = useState([]);
    const [mappo, setmappo] = useState("");
    useEffect(() => {
        setchangedusers(users);
    }, [users]);
    const handleChange = (e) => {
        const getWeather2 = async () => {
            try {
                const res = await axios.post('/users/sync2', {
                    "useruid": user.email
                })
                users = res.data;
                if (e.target.value === "") {
                    setchangedusers(users)
                }
                else {
                    console.log(e.target.value);
                    var tempusers = [];
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].username.toLowerCase().includes(e.target.value.toLowerCase())) {
                            tempusers.push(users[i]);
                        }
                    }
                    setchangedusers(tempusers)
                }
            } catch (e) {
                console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
            }
        };
        getWeather2();
    };
    const onrefresh = () => {
        const getWeather2 = async () => {
            try {
                const res = await axios.post('/users/sync2', {
                    "useruid": user.email
                })
                users = res.data;
                console.log("refreshed", users)
                setchangedusers(users)
            } catch (e) {
                console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e);
            }
        };
        getWeather2();
    }
    useEffect(() => {
        setmappo(
            <div className="sidebar__chats">
                {
                    changedusers.map((u) => (
                        <SidebarChat u={u} />
                    ))
                }
            </div>)
    }, [changedusers]);


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />

                <div className="sidebar__headerRight">
                    <IconButton>
                        <RefreshIcon onClick={() => { onrefresh() }}/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input onChange={(e) => { handleChange(e) }} placeholder="Search contact" type="text" />
                </div>
            </div>
            {mappo}

        </div>

    )
}

export default Sidebar
