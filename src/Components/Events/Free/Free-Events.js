import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from '../../../Redux/Events/events.actions';
import * as eventReducer from '../../../Redux/Events/events.reducer'
import Spinner from "../../Root/Util/Spinner/Spinner";

let Free_Events = () => {

  let dispatch = useDispatch();

  let eventsInfo = useSelector((state) => {
    return state[eventReducer.eventFeatureKey];
  });

  let { loading, events } = eventsInfo

  useEffect(() => {
    dispatch(eventActions.GetFreeEvent());
  }, []);

  return (

    <React.Fragment>

      <section className="p3 mt-5">
        <div className="container-xl">
          <div className="row">
            <div className="col text-white">
              <p className="h3">
                <i className=" fa fa-unlock" /> Free Events
              </p>
              <p className="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio itaque asperiores quia odit porro numquam eaque vero dolorum enim officiis sit quo, tenetur repellendus quaerat explicabo iusto quidem libero cum?</p>
              <p className="h5">Total Available : {events.length}</p>
            </div>
          </div>
        </div>
      </section>

      {

        loading ? <Spinner /> :
        
          <React.Fragment>
            {
              events.length > 0 ?
                <React.Fragment>
                  <section className="mt-3">
                    <div className="container-xl">
                      {
                        events.map(event => {
                          return (

                            <React.Fragment>
                              <div className="card mb-3 bg-secondary" style={{ maxwidth: '540px' }} key={event._id}>
                                <div className="row g-0">
                                  <div className="col-md-4">
                                    <img src={event.image} class="img-fluid rounded-start img-thumbnail" alt="..." />
                                  </div>
                                  <div className="col-md-8">
                                    <div className="card-body">
                                      <h5 className="card-title text-white">{event.name}</h5>
                                      <div className="row">
                                        <div className="col card-text text-white">
                                          <p>DATE : {event.date}</p>
                                          <p className=" small">PRICE : &#8377; {event.price}</p>
                                        </div>
                                        <div className="col">
                                          <button className="btn btn-sm log"><small className="text-body-secondary text-white">Book Here</small></button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          )
                        })
                      }

                    </div>
                  </section>

                </React.Fragment> : null
            }
          </React.Fragment>
      }

    </React.Fragment>

  )
}
export default Free_Events;