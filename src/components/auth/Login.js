import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }
    

    render() {

        const {errors} = this.state;

        return (
            <div>
                <h3>Login</h3>
                <div>
                    <label>Email Address:</label> <br />
                    <input
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                    />
                    {errors.length > 0 ? <p style={{color: "red"}}>{errors.email}</p> : null}
                </div>
                <div>
                    <label>Password:</label> <br />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={this.onChange}
                    />
                    {errors.length > 0 ? <p style={{color: "red"}}>{errors.password}</p> : null}
                </div>
                <button type="submit" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { loginUser })(Login);