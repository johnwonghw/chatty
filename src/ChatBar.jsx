import React, { Component } from 'react';
		
class ChatBar extends Component { 
	render () {
	console.log("Rendering <ChatBar/>") 
			return (
					<footer className="chatbar">
						<input className="chatbar-username" 
							defaultValue={this.props.currentUser.name} 
							placeholder="Your Name (Optional)"
							onKeyDown={(event) => {
									if (event.key === 'Enter') {
										switch (event.target.value) {
											case "":
												this.props.newUser("Anonymous")
												break;
											default:
												this.props.newUser(event.target.value);
										}
									}
								}
							} 
							/>
						<input className="chatbar-message" 
							placeholder="Type a message and hit ENTER" 
							onKeyDown={(event) => {
									if (event.key === 'Enter') {
										this.props.newPost(event.target.value);
										event.target.value = "";
									}
								}
							} />
					
					</footer>
			);
	}
}

export default ChatBar;