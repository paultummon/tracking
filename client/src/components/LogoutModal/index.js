import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'reactstrap';
import {Logout} from '../../Actions/authActions';

import PropTypes from 'prop-types'

class LogoutModal extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render(){
        return (
            <Fragment>
                <NavLink onClick={this.props.Logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

export default connect(null, {Logout})(LogoutModal)