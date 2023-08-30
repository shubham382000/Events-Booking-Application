import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as eventActions from '../../../Redux/Events/events.actions';
import * as userActions from '../../../Redux/Users/users.actions';
import * as userReducer from '../../../Redux/Users/users.reducer'

let Upload_Events = () => {

  let dispatch = useDispatch();

  let history = useNavigate();

  let useInfo = useSelector((state) => {
    return state[userReducer.usersFeatureKey]
  });

  let { user } = useInfo;

  let [event, setEvent] = useState({
    name: '',
    image: '',
    date: '',
    type: '',
    price: '',
    info: ''
  });

  let updateInput = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    })
  }

  let submitUpload = (e) => {
    e.preventDefault();
    console.log(event);
    dispatch(eventActions.uploadEvent(event, history));
  }

  return (

    <React.Fragment>
      <section className="p3 mt-5">
        <div className="container-xl">
          <div className="row">
            <div className="col">
              <p className="h3 text-light">
                <i className=" fa fa-file-upload log" /> Upload Events
              </p>
              <p className="lead text-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio itaque asperiores quia odit porro numquam eaque vero dolorum enim officiis sit quo, tenetur repellendus quaerat explicabo iusto quidem libero cum?</p>
            </div>
          </div>
        </div>
      </section>

      {
        user.isAdmin ?
          <React.Fragment>
            {/* <pre>{JSON.stringify(event)}</pre> */}
            <section className="mt-4">
              <div className="container-xl">
                <div className="row">
                  <div className="col-md-9">
                    <form onSubmit={submitUpload}>
                      <div className="form-group">
                        <input
                          required
                          name='name'
                          value={event.name}
                          onChange={updateInput}
                          type="text" className="form-control" placeholder="Name" />
                      </div>
                      <div className="form-group">
                        <input
                          required
                          name='image'
                          value={event.image}
                          onChange={updateInput}
                          type="text" className="form-control" placeholder="Image URL" />
                      </div>
                      <div className="form-group">
                        <input
                          required
                          name='date'
                          value={event.date}
                          onChange={updateInput}
                          type="text" className="form-control" placeholder="Date" />
                      </div>
                      <div className="form-group">
                        <select
                          required
                          name='type'
                          value={event.type}
                          onChange={updateInput}
                          className="form-control">
                          <option value="">Event Type</option>
                          <option value="Free">Free</option>
                          <option value="Pro">Pro</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          required
                          name='price'
                          value={event.price}
                          onChange={updateInput}
                          type="number" className="form-control" placeholder="Price" />
                      </div>
                      <div className="form-group">
                        <textarea
                          required
                          name='info'
                          value={event.info}
                          onChange={updateInput}
                          rows="04" className=" form-control" placeholder="Information"></textarea>
                      </div>
                      <div>
                        <input type="submit" className="btn btn-sm log text-white" value="Upload" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>

          : <div className="container mt-5">
            <div className="row">
              <div className="col">
                <p className="h5 text-light fw-bold text-center">-----------------Unauthorized Access------------------</p>
                <p className="h6 text-light text-center">----------------------------If you are an Admin ? Contact DBA for the access------------------------------</p>
              </div>
            </div>
          </div>
      }

    </React.Fragment>

  )
}
export default Upload_Events;