import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div>
                <h2>Welcome To React App</h2>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
            </div>
        )
    }
}

export default Landing;