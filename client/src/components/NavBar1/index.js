import React from 'react'
import css from './NavBar.module.css'
import { connect } from 'react-redux'
import LoginModal from '../LoginModal'
import {Logout} from '../../Actions/authActions';

const NavBar = (props) => {
  const { Logout, auth: { isAuthenticated, user } } = props
  return (
    <nav className={css.navBar}>
      <div href='/'>
        Home
      </div>
      <div>
       {user && user.name ? `Welcome Back ${user.name}` : '' }
      </div>
      <div className={css.logLinks}>
      {!isAuthenticated && <LoginModal/>}
      <div onClick={Logout}>
        Logout
      </div>

      </div>

      
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

// const mapStateToProps = (state) => ({
//   auth: state.auth
// })

// const matchDispatchToProps = (dispatch) => {
//   return bindActionCreators({ logoutUser: logoutUser }, dispatch)
// }

export default connect(mapStateToProps, {Logout})(NavBar)
