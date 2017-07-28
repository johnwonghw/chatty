import React, {Component} from 'react';

class Message extends Component {
    render() {
        console.log ("Rendering <Message/>", this)
        const messageList = this.props.messages.map((message) => {
          return (<div key={message.id} className="message">
            <span className="message-username" style={{color: this.props.userColor}} >{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>);
        })
        return (
        <main className="messages">
          {messageList}
          <div className="message system">
            {this.props.userNotification}
          </div>
        </main>
        );
    }
}
export default Message;