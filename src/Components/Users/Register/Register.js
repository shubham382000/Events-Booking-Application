import React, { useState } from "react";
import brand from '../../../Assets/Images/Appointy-Logo1-Events.svg';
import { Link } from "react-router-dom"; 
import * as actionalerts from '../../../Redux/Alerts/alerts.actions'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as userActions from '../../../Redux/Users/users.actions'; 
import * as userReducer from '../../../Redux/Users/users.reducer'

let Register = () => {

  let history = useNavigate(); 

  let dispatch = useDispatch(); 

  let [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  let [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    passwordError: ''
  });

  let validateUser = (event) => {
    setUser({
      ...user,
      name: event.target.value
    });
    let regExp = /^[a-zA-Z0-9_ /]{3,15}$/;
    if (!regExp.test(event.target.value)) {
      setUserError({
        ...userError,
        nameError: 'Enter a proper name'
      });
    }
    else {
      setUserError({
        ...userError,
        nameError: ''
      });
    }
  }

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
      password : event.target.value
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

  let submitRegister = (event) => {
       event.preventDefault(); 
       if (user.name !== '' && user.email !== '' && user.password !== ''){
        console.log(user); 
        // dispatch action with user, history 
        dispatch(userActions.registerUser(user, history)); 
       }
       else {
            dispatch(actionalerts.setAlert('Please fill in the form', 'danger')); 
       }
  }

  return (

    <React.Fragment>
      {/* <pre>{JSON.stringify(user)}</pre>
      <pre>{JSON.stringify(userError)}</pre> */}
      <section className="p3 mt-5">
        <div className="container-xl">
          <div className="row">
            <div className="col">
              <p className="h3 text-light">
                <i className=" fa fa-user-circle text-light" /> Register Here
              </p>
              <p className="lead text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio itaque asperiores quia odit porro numquam eaque vero dolorum enim officiis sit quo, tenetur repellendus quaerat explicabo iusto quidem libero cum?</p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-3">
        <div className="row">
          <div className="col-md-4 m-auto">
            <div className="card animated fadeIn ">
              <div className="card-header text-white log">
                <p className="h3 text-center">Register Here</p>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={submitRegister}>
                  <div className="form-group">
                    <input
                      name="name"
                      value={user.name}
                      onChange={validateUser}
                      type="name" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : null}`} placeholder="UserName" />
                    {
                      userError.nameError.length > 0 ? <small className="text-danger">{userError.nameError}</small> : ''
                    }
                  </div>
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
                    <input
                      type="submit" value='Register' className="btn text-white log btn-sm" />
                  </div>
                </form>
                <small>
                  Already have an account ? <Link to='/users/login' className=" fw-bold text-dark">Login</Link>
                </small>
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
export default Register;