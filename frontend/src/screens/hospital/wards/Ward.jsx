import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import WardDataService from "../../../services/WardService";
import { Link} from 'react-router-dom';

const Ward = props => {
  const initialWardState = {
    id: null,
    ward_name: "",
    description: "",
    total_beds: "",
  };
  const [currentWard, setCurrentWard] = useState(initialWardState);
  const [message, setMessage] = useState("");

  const getWard = id => {
    WardDataService.get(id)
      .then(response => {
        setCurrentWard(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getWard(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentWard({ ...currentWard, [name]: value });
  };

  const updateWard = () => {
    WardDataService.update(currentWard.id, currentWard)
      .then(response => {
        console.log(response.data);
        setMessage("The ward was updated successfully!");
        alert('Updated: ' + this.state);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteWard = () => {
    WardDataService.remove(currentWard.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/hospital/wards");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <><div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a /**href="/hospital/wards" */className="navbar-brand">
          Wards
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/hospital/wards"} className="nav-link">
              Wards
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/hospital/add_wards"} className="nav-link">
              Add Wards
            </Link>
          </li>
        </div>
      </nav></div>
    <br></br>
    
    <div>
      {currentWard ? (
        <div className="edit-form">
          <div class="container-sm border">
            <div class="row max-height justify-content-center align-items-center">
            <div class="col-10 mx-auto banner text-center">
                        <h3 class="text-capitalize">
                            <strong class="banner-title">Edit Ward Details ?</strong></h3>
                            <div class="card-body register-card-body"></div>
          <form>
            <div className="form-group">
              <label class="float-left" htmlFor="title">Ward Name:</label>
              <input
                type="text"
                className="form-control"
                id="ward_name"
                name="ward_name"
                value={currentWard.ward_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label class="float-left" htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentWard.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label class="float-left" htmlFor="total_beds">Total no of beds:</label>
              <input
                type="number"
                className="form-control"
                id="total_beds"
                name="total_beds"
                value={currentWard.total_beds}
                onChange={handleInputChange}
              />
            </div>

          </form>
          <div class="btn-group">
          <button 
            type="submit"
            class="btn btn-success"
            onClick={updateWard}
          >
            Update
          </button> </div>
          <div class="btn-group">
          <button 
          type= "button"
          class="btn btn-danger"
          onClick={deleteWard}>
            Delete
          </button></div></div></div></div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Ward...</p>
        </div>
      )}
    </div></>
  );
};

export default Ward