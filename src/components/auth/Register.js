import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            pin: '',
            level: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    // Lifecycle Method
    // When component will recieves new properties
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            pin: this.state.pin,
            level: this.state.level,
            password: this.state.password
        } 

        this.props.registerUser(newUser, this.props.history);
    }
    render() {

        const {errors} = this.state;

        return (
            <div>
                <h3>Sign Up</h3>
                <div>
                    <label>Full Name:</label> <br />
                    <input
                        placeholder="Full Name"
                        name="name"
                        type="text"
                        onChange={this.onChange}
                    />
                    {errors.length > 0 && errors.name ? <p style={{color: "red"}}>{errors.name}</p> : null}
                </div>
                <div>
                    <label>Email Address:</label> <br />
                    <input
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                    />
                    {errors.length > 0 && errors.email ? <p style={{color: "red"}}>{errors.email}</p> : null}
                </div>
                <div>
                    <label>Pin:</label> <br />
                    <input
                        placeholder="Pin"
                        name="pin"
                        type="text"
                        onChange={this.onChange}
                    />
                    {errors.length > 0 && errors.pin ? <p style={{color: "red"}}>{errors.pin}</p> : null}
                </div>
                <div>
                    <select name="level" onChange={this.onChange}>
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                        <option value="regular">Regular</option>
                    </select>
                    {errors.length > 0 && errors.level ? <p style={{color: "red"}}>{errors.level}</p> : null}
                </div>
                <div>
                    <label>Password:</label> <br />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={this.onChange}
                    />
                    {errors.length > 0 && errors.password ? <p style={{color: "red"}}>{errors.password}</p> : null}
                </div>
                <button type="submit" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

// Map all of our PropTypes
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));