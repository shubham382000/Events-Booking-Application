import React from "react";
import { Link } from "react-router-dom";

let Home = () => {

  return (

    <React.Fragment>
      <div className="landing-page">
        <div className="wrapper">
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
            <h5 className="display-4 text-center">
              Events Booking
            </h5>
            <p className="lead px-4 textt text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At praesentium perspiciatis, cum delectus fugit fugiat ipsum! Aut ex dolorum eos!
            </p>
            <Link to='/events/free' className="btn btn-sm bg-gradient-light bg-danger text-gray-500 text-capitalize" style={{ color: 'rgb(179, 230, 247)' }}>Book Now</Link>
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}
export default Home;