import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render () {
        console.log ("Rendering <MessageList/>")
        return (
            <div className="message-List">
                <Message/ >
            </div>
        );
    }
}
export default MessageList;