import React from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, SearchOutlined } from '@material-ui/icons';
import { useStateValue } from './StateProvider';

function ContactDetails({ messages }) {
    const [{ contact }] = useStateValue();
    const setimo = () => {
        if (messages.length > 0) {
            if(messages[0].allmessages[messages[0].allmessages.length - 1]===undefined){
                return " recently"
            }
            var timo = messages[0].allmessages[messages[0].allmessages.length - 1].received;
            var newtime = timo;
            newtime = newtime.slice(newtime.length - 10);
            var today = new Date();
            today = today.toISOString().slice(0, 10);
            if (newtime === today) {
                var str = timo;
                str = str.substring(0, str.length - 10);
                str =" at "+ str + "today";
                return str;
            }
            else {
                return (" at "+timo);
            }
        }
        else{
            return " recently"
        }
    }
    return (
        <div className="chat__header">
            <Avatar src={contact?.purl} />
            <div className="chat__headerInfo">
                <h3>{contact?.username}</h3>
                <p>Last seen{setimo()}</p>
            </div>

            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
    )
}

export default ContactDetails
