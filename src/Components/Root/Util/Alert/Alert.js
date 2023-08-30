import React from "react";
import { useSelector } from "react-redux";
import * as alertReducer from '../../../../Redux/Alerts/alerts.reducer'

let Alert = () => {

  let alertList = useSelector((state) => {
    return state[alertReducer.alertFeatureKey];
  });

  return (

    <React.Fragment>
      {
        alertList.length > 0 ?
          <div key={alert.id}>
            <div className={`alert alert-${alertList[0].color} alert-dismissible m-2 fixed-top animated zoomIn`}>
              <small className=" font-weight-bold">
              <button className="close"><i className=" fa fa-times-circle"></i></button>
                {
                  alertList.map(alert => {
                    return (
                      <React.Fragment>
                        <small className="font-weight-bold">{alert.message}</small>
                      </React.Fragment>
                    )
                  })
                }</small>
            </div>
          </div> : null
      }

    </React.Fragment>

  )
}
export default Alert;