import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const ws = new WebSocket('ws://0.0.0.0:3001');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      userNotification: "",
      messages: []
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
    // Why is this.state undefined here, but defined in componentDidMount?
    const message = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: post,
    };
    // const newMessages = this.state.messages.concat(message);
    ws.send(JSON.stringify(message))
    // this.setState({messages: newMessages})
  }

  componentDidMount() {
    console.log("componentDidMount <App />");  

    ws.onopen = () => {
      console.log('Connected to Server');
    };
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      
      switch (messageData.type) {
        case "incomingNotification":
        this.setState({userNotification: messageData.content})
          break;
        case "incomingMessage":
          const message ={username: messageData.username,
                          content: messageData.content,}
          const broadcastedMessage = this.state.messages.concat(message);
          this.setState({messages: broadcastedMessage})
          console.log(messageData)
            break;
        default:
            console.log("Error")
      }


    }  
  }

  render() {
    console.log("Rendering <App/> ")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} userNotification={this.state.userNotification} />
        <ChatBar currentUser={this.state.currentUser} newPost={this.newPost} newUser={this.newUser} />

      </div>
    );
  }
}
