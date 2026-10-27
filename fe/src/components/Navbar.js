import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends PureComponent {
  render() {
    const { setTitle, title, location } = this.props;

    const isUploadPage = location.pathname === "/upload";

    return (
      <nav className="navbar navbar-expand topbar shadow-sm">
        <div className="navbar-brand-area">
          <div className="navbar-brand-icon">
            <i className="fas fa-award" aria-hidden="true"></i>
          </div>

          <div className="navbar-heading">
            <span className="navbar-brand-name">Reward Point</span>
            <span className="navbar-page-title">{title}</span>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="navbar-navigation">
            <Link
              className={`nav-link ${!isUploadPage ? "nav-link-active" : ""}`}
              onClick={() => setTitle("Reward Points")}
              to="/"
              aria-current={!isUploadPage ? "page" : undefined}
            >
              <i className="fas fa-gift" aria-hidden="true"></i>
              <span>Rewards</span>
            </Link>

            <Link
              className={`nav-link ${isUploadPage ? "nav-link-active" : ""}`}
              onClick={() => setTitle("Upload Purchase History")}
              to="/upload"
              aria-current={isUploadPage ? "page" : undefined}
            >
              <i className="fas fa-cloud-upload-alt" aria-hidden="true"></i>
              <span>Upload</span>
            </Link>
          </div>

          <a
            className="downloadButton navbar-download"
            href="/txn.csv"
            download
          >
            <i className="fas fa-download" aria-hidden="true"></i>
            <span>Download Template</span>
          </a>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
