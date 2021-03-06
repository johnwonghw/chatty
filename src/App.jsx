import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const ws = new WebSocket('ws://0.0.0.0:3001');

//chooses a random color from an array and returns color as string. Changes the color of the user's username
function randomColor() {
  const colorOptions = ["#FF0000", "#1A55F4", "#3AC61A", "#19E8D2"];
  const colorChoice = colorOptions[Math.floor(Math.random() * colorOptions.length)];
  return colorChoice;
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      userNotification: "",
      messages: [],
      usersAmount: 0,
      userColor: randomColor(),
    };
    
    this.newPost = this.newPost.bind(this);
    this.newUser = this.newUser.bind(this);
  }

  newUser(user) {
    this.setState({currentUser:{ name: user }})
    const userChangeNotification = {
                                    type: "postNotification",
                                    content: `${this.state.currentUser.name} has changed their name to ${user}`
                                   }
    ws.send(JSON.stringify(userChangeNotification))
  }

  newPost(post) {
    //Defaults usernames to Anonymous until changed in the Chatbar
    if (!this.state.currentUser.name) {
      this.state.currentUser.name = "Anonymous"
    }
    const message = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: post,
    };
    ws.send(JSON.stringify(message))
  }

  componentDidMount() {

    ws.onopen = () => {
    console.log('Connected to Server');
    };
  
    ws.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    
      switch (messageData.type) {
        //Notifies users when users change their username
        case "incomingNotification":
        this.setState({userNotification: messageData.content})
          break;
        //Updates messagelist users type in the Chat Bar
        case "incomingMessage":
          const message ={username: messageData.username,
                          content: messageData.content,}
          const broadcastedMessage = this.state.messages.concat(message);
          this.setState({messages: broadcastedMessage})
          console.log(messageData)
            break;
        //Updates the amount of clients connected to server
        case "incomingUserSize":
          console.log(messageData.currentUserCount)
          this.setState({usersAmount: messageData.currentUserCount})
            break;
        default:
            console.log("Error")
      }
    }  
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="userAmount">{this.state.usersAmount} users online</span>
        </nav>
        <MessageList messages={this.state.messages} userNotification={this.state.userNotification} userColor={this.state.userColor} />
        <ChatBar currentUser={this.state.currentUser} newPost={this.newPost} newUser={this.newUser} />
      </div>
    );
  }
}
