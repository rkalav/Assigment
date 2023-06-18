import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends PureComponent {
  render() {
    const { setTitle } = this.props;
    return (
      <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow bg-gradient-primary ">
        <div>
          <h6 style={{ color: '#fff' }}>{this.props.title}</h6>
        </div>
        <div className="nav-item">
          <Link className="nav-link" onClick={() => setTitle("Reward Points")} to={"/"}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span style={{ fontSize: '17px' }}>Reward</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link className="nav-link" onClick={() => setTitle("Upload Purchase History")} to={"/upload"}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span style={{ fontSize: '17px' }}>Updload</span>
          </Link>
        </div>
          <a className="downloadButton" href="/txn.csv" download>
            <i className="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;Download Template
          </a>
      </nav>
    );
  }
}
