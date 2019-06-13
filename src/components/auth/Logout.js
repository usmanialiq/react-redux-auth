import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Logout extends Component {

    onLogoutClink(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {

        const { isAuthenticated } = this.props.auth;

        const authLinks = (
            <div>
                <button onClick={this.onLogoutClink.bind(this)} className="nav-link">
                Log Out
                </button>
            </div>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                {isAuthenticated ? authLinks : null}
            </nav>
        )
    }
}

Logout.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Logout);