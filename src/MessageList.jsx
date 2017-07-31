import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {
		return (
			<div className="message-List">
				<Message messages={this.props.messages} userNotification={this.props.userNotification} userColor={this.props.userColor} />
			</div>
		);
	}
}
export default MessageList;