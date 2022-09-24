import React from 'react';
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import axios from './axios';

function SidebarChat({ u }) {
    const [{ user }, dispatch] = useStateValue();
    // const [{ roomName }, dispatch] = useStateValue();
    const makeroomname = (a, b) => {
        var emails = [a, b];
        emails.sort();
        var ans = emails[0] + "#####" + emails[1];
        return ans;
    };
    const transferinroom = () => {
        const room = makeroomname(user.email, u.useruid);

        if (room) {
            const getWeather2 = async () => {
                await axios.post('/createroom', {
                    "roomname": room
                }).then(
                    dispatch({
                        type: actionTypes.SET_ROOM,
                        room: room,
                        contact: u,
                        lastseen: u.lastseen
                    }))
              };
            getWeather2();
        }
    };
    return (
        <div onClick={transferinroom} className="sidebarChat">
            <Avatar src={u.purl} />
            <div className="sidebarChat__info">
                <h2>{u.username}</h2>
                {/* <p>This is a message</p> */}
            </div>

        </div>
    )
}

export default SidebarChat
