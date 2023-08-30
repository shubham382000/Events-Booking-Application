import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Root/Layout/Home/Home';
import Navbar from './Components/Root/Layout/Navbar/Navbar';
import Free_Events from './Components/Events/Free/Free-Events';
import Pro_Events from './Components/Events/Pro/Pro-Events';
import Upload_Events from './Components/Events/Upload/Upload-Events';
import Login from './Components/Users/Login/Login';
import Register from './Components/Users/Register/Register';
import Alert from './Components/Root/Util/Alert/Alert';
import * as userActions from './Redux/Users/users.actions';
import * as userUtil from './Components/Root/Util/UserUtil';
import { useDispatch } from 'react-redux';
import PrivateRoute from './Components/Root/Util/PrivateRoute';

let App = () => {

  let dispatch = useDispatch();

  useEffect(() => {
    if (userUtil.getToken()) {
      dispatch(userActions.getUserInfo());
    }
  })

  return (
    <React.Fragment>

      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/events/free" Component={Free_Events} />
          <Route Component={PrivateRoute}>
          <Route exact path="/events/pro" Component={Pro_Events} />
          </Route>
          <Route Component={PrivateRoute}>
          <Route exact path="/events/upload" Component={Upload_Events} />
          </Route>
          <Route exact path="/users/login" Component={Login} />
          <Route exact path="/users/register" Component={Register} />
        </Routes>
      </Router>

    </React.Fragment>
  );
}
export default App; 