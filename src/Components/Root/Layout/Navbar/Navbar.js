import React from "react";
import { Link } from "react-router-dom";
import brand from '../../../../Assets/Images/Appointy-Logo1-Events.svg';
import * as userUtil from '../../Util/UserUtil';
import * as userActions from '../../../../Redux/Users/users.actions';
import * as userReducer from '../../../../Redux/Users/users.reducer';
import { useDispatch, useSelector } from "react-redux";

let Navbar = () => {

  let dispatch = useDispatch();

  let userinfo = useSelector((state) => {
    return state[userReducer.usersFeatureKey];
  })

  let { isAuthenticated, user } = userinfo;

  let clickLogOut = () => {
    dispatch(userActions.logoutUser());
  }

  let beforeLoginLinks = (
    <React.Fragment>

      <li className="nav-item px-2">
        <Link to='/users/login' className="nav-link"><i className="fa fa-user-circle text-muted w-25 h-25" style={{ marginRight: '0.5rem' }} />Login</Link>
      </li>
      <li className="nav-item px-2">
        <Link to='/users/register' className="nav-link"><i className="fa fa-sign-out-alt text-muted" style={{ marginRight: '0.4rem' }} />Register</Link>
      </li>

    </React.Fragment>
  )

  let afterLoginLinks = (
    <React.Fragment>

      <li className="nav-item px-2">
        <Link to='/' className="nav-link"><img src={user.avatar} alt="" height={25} width={25} className=" rounded-circle mx-1 text-muted" />{user.name}</Link>
      </li>
      <li className="nav-item px-2">
        <Link to='/' className="nav-link" onClick={clickLogOut}><i className="fa fa-sign-out-alt text-muted" style={{ marginRight: '0.2rem' }} />Logout</Link>
      </li>

    </React.Fragment>
  )


  return (

    <React.Fragment>

      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <div className="container-xl">
          <Link to='/' className="navbar-brand">
            <img src={brand} alt="" width='201' height='40' />
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav  ms-auto navv">
              <li className="nav-item px-3">
                <Link to='/events/free' className="nav-link">Free Events</Link>
              </li>
              <li className="nav-item">
                <Link to='/events/pro' className="nav-link px-3">Pro Events</Link>
              </li>
              <li className="nav-item">
                <Link to='/events/upload' className="nav-link px-3">Upload Events</Link>
              </li>
            </ul>
            <ul className="navbar-nav shift">
              {

                userUtil.isLoggedIn() ? afterLoginLinks : beforeLoginLinks

              }
            </ul>
          </div>
        </div>
      </nav>

    </React.Fragment>

  )
}
export default Navbar;