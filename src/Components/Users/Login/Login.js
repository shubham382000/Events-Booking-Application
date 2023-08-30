import React, { useState } from "react";
import brand from '../../../Assets/Images/Appointy-Logo1-Events.svg';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userActions from '../../../Redux/Users/users.actions';
import * as userReducer from '../../../Redux/Users/users.reducer';
import * as actionalerts from '../../../Redux/Alerts/alerts.actions'

let Login = () => {

  let dispatch = useDispatch();
  let history = useNavigate();

  let [user, setUser] = useState({
    email: '',
    password: ''
  });

  let [userError, setUserError] = useState({
    emailError: '',
    passwordError: ''
  });

  let validateEmail = (event) => {
    setUser({
      ...user,
      email: event.target.value
    });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regExp.test(event.target.value)) {
      setUserError({
        ...userError,
        emailError: 'Enter a proper Email'
      });
    }
    else {
      setUserError({
        ...userError,
        emailError: ''
      });
    }
  }

  let validatePassword = (event) => {
    setUser({
      ...user,
      password: event.target.value
    });
    let regExp = /^[A-Za-z]\w{7,14}$/;
    if (!regExp.test(event.target.value)) {
      setUserError({
        ...userError,
        passwordError: 'Enter a proper Password'
      });
    }
    else {
      setUserError({
        ...userError,
        passwordError: ''
      });
    }
  }

  let submitLogin = (event) => {
    event.preventDefault();
    if (user.email !== '' && user.password !== '') {
      dispatch(userActions.LoginUser(user, history));
    }
    else {
      dispatch(actionalerts.setAlert('Invalid Credentials', 'danger'));
    }
  }

  


  return (

    <React.Fragment>

      <section className="p3 mt-5">
        <div className="container-xl">
          <div className="row">
            <div className="col">
              <p className="h3 text-light">
                <i className=" fa fa-user-circle text-white" /> Login Here
              </p>
              <p className="lead text-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio itaque asperiores quia odit porro numquam eaque vero dolorum enim officiis sit quo, tenetur repellendus quaerat explicabo iusto quidem libero cum?</p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-3">
        <div className="row">
          <div className="col-md-4 m-auto">
            <div className="card animated fadeIn ">
              <div className="card-header log text-white">
                <p className="h3 text-center">Login Here</p>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={submitLogin}>
                  <div className="form-group">
                    <input
                      name="email"
                      value={user.email}
                      onChange={validateEmail}
                      type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : null}`} placeholder="Email" />
                    {
                      userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : ''
                    }
                  </div>
                  <div className="form-group">
                    <input
                      name="password"
                      value={user.password}
                      onChange={validatePassword}
                      type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : null}`} placeholder="Password" />
                    {
                      userError.passwordError.length > 0 ? <small className="text-danger">{userError.passwordError}</small> : ''
                    }
                  </div>
                  <div>
                    <input type="submit" value='Login' className="btn btn-sm log text-white" placeholder="Password" />
                  </div>
                  <small>
                    Dont have an account ? <Link to='/users/register' className=" fw-bold text-dark">Register</Link>
                  </small>
                </form>
              </div>
              <div className="card-footer text-center">
                <img src={brand} alt="" width='160' height='35' />
              </div>
            </div>
          </div>
        </div>
      </section>

    </React.Fragment>

  )
}
export default Login;