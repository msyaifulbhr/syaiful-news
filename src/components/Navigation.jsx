import React from 'react';
import { Link } from 'react-router-dom';
 
function Navigation() {
	return (
        <header className="note-app__header">
			<h1>Syaiful Newsss</h1>
			<nav>
			<Link to="/">Home</Link>
			<Link to="/likes">Likes</Link>
		</nav>
		</header>
		
	)
}
 
export default Navigation;