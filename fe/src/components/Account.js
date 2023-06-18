import React, { Component } from "react";
import { get, getDays, SEARCH_DATE } from "../helper/Util";
import { AccountInfo, AccountDetails, Search, SearchInfo } from "./AccountDetails";
import { AccountDetailsModel } from "./AccountDetailsModal";
import { createQueryStr, GET_ALL_REWARDS, GET_PURCHASE_BY_CUSTOMER, GET_TOTAL_REWARDS } from "./UrlConstants";

export default class Account extends Component {
  state = {
    selectedDate: "",
    isSearch: false,
    isAccountDetails: false,
    customer: [],
    transectionHistory: [],
    totalReward: 0,
    sid: 0,
    showData:false
  };

  start = "";
  end = "";

  updateState = (data) => {
    this.setState(data);
  };

  componentWillMount() {
    this.state.selectedDate = SEARCH_DATE.year + "-" + SEARCH_DATE.month;
  }

  onSearchClick = () => {
    const { selectedDate } = this.state;
    if (selectedDate) {
      this.setState({ customer: [], transectionHistory: [], isSearch: false, isAccountDetails: false });
      const dates = getDays(this.state.selectedDate);
      this.start = dates.start;
      this.end = dates.end;
      const dt = createQueryStr({ from: dates.start, till: dates.end});
      const url = GET_ALL_REWARDS + dt;
      const url2 = GET_TOTAL_REWARDS + dt;
      get(url2, (data, err) => {
        if (data) {
          const rewards = parseInt(data);
          if (!Number.isNaN(rewards)) this.setState({ totalReward: rewards });
          else this.setState({ totalReward: 0 });
        }
      });
      get(url, (data, err) => {
        if (data) {
          this.setState({
            customer: JSON.parse(data),
          });
        } else {
          this.setState({ customer: [] });
        }
        this.setState({ isSearch: true, isAccountDetails: false });
      });
    }
  };

  onSelectCustomer = (id) => {
    this.setState({ sid: id });
    const url = GET_PURCHASE_BY_CUSTOMER + id + createQueryStr({ from: this.start, till: this.end });
    get(url, (data, err) => {
      if (data) {
        this.setState({ transectionHistory: JSON.parse(data) });
      }
      this.setState({ showData :true})
    });
  };

  render() {
    const { customer, transectionHistory, selectedDate, isSearch, sid, isAccountDetails, totalReward, showData } = this.state;
    return (
      <div className="row">
        <Search updateState={this.updateState} onSearchClick={this.onSearchClick} selectedDate={selectedDate} />
        <div className="col-12">
          {isSearch ? (
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div className="row">
                  <SearchInfo total={totalReward} selectedDate={selectedDate} />
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 rounded">
                    {customer.length ? (
                      <div>
                        {customer.map((e, i) => (
                          <AccountInfo onSelectCustomer={this.onSelectCustomer} key={i} sid={sid} {...e} />
                        ))}
                      </div>
                    ) : null}
                    {!customer.length && isSearch ? <div className="m-auto">No Data Found</div> : null}
                  </div>
                  {showData ? <AccountDetailsModel transectionHistory={transectionHistory} isAccountDetails={isAccountDetails} onClose={() => this.setState({ showData :false})} />:null}
                  
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
