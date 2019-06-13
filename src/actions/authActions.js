// Node Modules
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
import {register, login} from '../routes';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(register, userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
    );
}

// Login - Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post(login, userData)
        .then(res => {
            // Save to local storage
            const { token } = res.data;

            // Set Token to local storage
            localStorage.setItem('jwtToken', token);

            // Set Token to auth header
            setAuthToken(token);

            // Decode Token to get User Data
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};

// Set Logged in User
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log Uer Out
export const logoutUser = () => dispath => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');

    // remove auth header for future requests
    setAuthToken(false);
    // set the current user to {} which will also set isAuthenticated: false
    dispath(setCurrentUser({}));
}