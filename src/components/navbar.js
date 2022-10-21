import React, { useState } from 'react';

import "bootstrap/dist/css/bootstrap.css";

import { NavLink } from "react-router-dom";

export default function Navbar(props) {

  const[tags, setTags] = useState("");

  return (
    <div class="container">
      <div class="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div class="col-sm-3 text-center">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </div>
          <div class="col-md-4 offset-md-1">
            <input type="text" class="form-control align right" onChange={(e) => setTags(e.target.value.replaceAll(' ', '_'))} placeholder="Search"/>
          </div>
          <div class="col-sm-2">
            <NavLink className="nav-link" to={"/search/" + tags.replaceAll(', ', '+').replaceAll(' ', '_')}>
              <button class="btn btn-primary">Search</button>
            </NavLink>
          </div>
          <div class="col-sm-3 text-center">
            <NavLink className="nav-link" to="/create">
              Create Entry
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}