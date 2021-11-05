import React, { Component } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthUser} from '../actions/authUser';
import { Button } from '@chakra-ui/react'

class NavBar extends Component  {

  handleLogout = (e) => {
    e.preventDefault();
      this.props.setAuthUser(null);
  };

  render(){
    const { authUser, users} = this.props;
    return (
      <nav className='nav'>
      <ul>
              <NavLink to='/'>Home </NavLink>
         <NavLink to='/add' >   New Question</NavLink>
        <NavLink to='/leaderboard'>   Leader Board   </NavLink>
         
          <li className="user-info" style={{float:"right"}}>
          {authUser === null ? (
                <NavLink className="waves-effect waves-light btn" to="/login">
                  LOGIN <i className="material-icons right">account_circle</i>
                </NavLink>
              ) : (
                <span>
                  <img
                    className="avatar"
                    src={users[authUser].avatarURL}
                    alt=""
                  />
                  <span className="hide-on-med-and-down">
                    {users[authUser].name}
                  </span>
                  <Button onClick={this.handleLogout}>
                    LOGOUT
                  </Button>
                </span>
              )}            
                  </li>
          
      </ul>
  </nav>
    );
  }
}


const  mapStateToProps = ({ users, authUser })  => ({
    authUser,
    users,
});


export default withRouter(connect(mapStateToProps, {setAuthUser})(NavBar));
