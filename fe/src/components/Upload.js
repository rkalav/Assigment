import React, { PureComponent } from "react";
import { getCSV } from "../helper/CSVUtil";
import { post } from "../helper/Util";
import { SAVE_PURCHASE } from "./UrlConstants";

export default class Upload extends PureComponent {
  onInputChange = async (e) => {
    const jsonData = await getCSV(e.target.files[0]);
    this.submitToUpload(jsonData);
  };

  submitToUpload = (data) => {
    post(SAVE_PURCHASE, data, (data, err, status) => {
      if (status === 200) {
        alert("Successfully Upload");
      }
    });
  };

  onUploadClick = () => {
    const uploader = document.getElementById("uploader");
    if (uploader) {
      uploader.click();
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <input type="file" id="uploader" style={{ position: "fixed", top: "-10000px" }} onChange={this.onInputChange} />
              <h6 className="m-0 font-weight-bold text-primary">Purchase Transection</h6>
            </div>
            <div className="card-body">
              <center>
                <button className="btn btn-primary btn-icon-split" style={{ backgroundColor: '#a1542e' }} onClick={this.onUploadClick}>
                  <span>
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </span>
                  <span className="text">Upload Transection CSV</span>
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
