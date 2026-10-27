import React, { Component } from "react";
import { get, getDays, SEARCH_DATE } from "../helper/Util";
import { AccountInfo, Search, SearchInfo } from "./AccountDetails";
import { AccountDetailsModel } from "./AccountDetailsModal";
import {
createQueryStr,
GET_ALL_REWARDS,
GET_PURCHASE_BY_CUSTOMER,
GET_TOTAL_REWARDS,
} from "./UrlConstants";

export default class Account extends Component {
state = {
selectedDate: ${SEARCH_DATE.year}-${SEARCH_DATE.month},
isSearch: false,
isAccountDetails: false,
customer: [],
transectionHistory: [],
totalReward: 0,
sid: 0,
showData: false,
isLoading: false,
error: "",
};

start = "";
end = "";

updateState = (data) => {
this.setState(data);
};

onSearchClick = () => {
const { selectedDate } = this.state;

if (!selectedDate) return;

this.setState({
  customer: [],
  transectionHistory: [],
  isSearch: false,
  isAccountDetails: false,
  showData: false,
  isLoading: true,
  error: "",
  totalReward: 0,
});

const dates = getDays(selectedDate);
this.start = dates.start;
this.end = dates.end;

const query = createQueryStr({
  from: dates.start,
  till: dates.end,
});

const rewardsUrl = GET_TOTAL_REWARDS + query;
const customersUrl = GET_ALL_REWARDS + query;

get(rewardsUrl, (data, err) => {
  if (!err && data != null) {
    const rewards = parseInt(data, 10);

    this.setState({
      totalReward: Number.isNaN(rewards) ? 0 : rewards,
    });
  }
});

get(customersUrl, (data, err) => {
  if (err) {
    this.setState({
      customer: [],
      error: "Unable to load rewards. Please try again.",
      isSearch: true,
      isLoading: false,
    });
    return;
  }

  try {
    const customers = data ? JSON.parse(data) : [];

    this.setState({
      customer: Array.isArray(customers) ? customers : [],
      isSearch: true,
      isLoading: false,
    });
  } catch (error) {
    this.setState({
      customer: [],
      error: "The rewards data could not be read.",
      isSearch: true,
      isLoading: false,
    });
  }
});

};

onSelectCustomer = (id) => {
this.setState({
sid: id,
transectionHistory: [],
showData: false,
isAccountDetails: false,
});

const url =
  GET_PURCHASE_BY_CUSTOMER +
  id +
  createQueryStr({
    from: this.start,
    till: this.end,
  });

get(url, (data, err) => {
  if (err) {
    this.setState({
      transectionHistory: [],
      showData: true,
    });
    return;
  }

  try {
    const history = data ? JSON.parse(data) : [];

    this.setState({
      transectionHistory: Array.isArray(history) ? history : [],
      showData: true,
    });
  } catch (error) {
    this.setState({
      transectionHistory: [],
      showData: true,
    });
  }
});

};

render() {
const {
customer,
transectionHistory,
selectedDate,
isSearch,
sid,
isAccountDetails,
totalReward,
showData,
isLoading,
error,
} = this.state;

return (
  <div className="account-page">
    <div className="account-page-heading">
      <div>
        <h1 className="account-page-title">Rewards Overview</h1>
        <p className="account-page-subtitle">
          Explore monthly rewards and customer purchase history.
        </p>
      </div>
    </div>

    <div className="row">
      <Search
        updateState={this.updateState}
        onSearchClick={this.onSearchClick}
        selectedDate={selectedDate}
      />

      <div className="col-12">
        {isSearch && (
          <div className="card shadow-sm mb-4 account-results-card">
            <div className="card-header py-3">
              <div className="row align-items-center">
                <SearchInfo
                  total={totalReward}
                  selectedDate={selectedDate}
                />
              </div>
            </div>

            <div className="card-body">
              {isLoading ? (
                <div className="account-state" role="status">
                  <span className="account-state-spinner" />
                  <span>Loading rewards...</span>
                </div>
              ) : error ? (
                <div className="account-state account-state-error" role="alert">
                  <i
                    className="fas fa-exclamation-circle"
                    aria-hidden="true"
                  />
                  <span>{error}</span>
                </div>
              ) : customer.length > 0 ? (
                <div className="account-customer-list">
                  {customer.map((item, index) => (
                    <AccountInfo
                      onSelectCustomer={this.onSelectCustomer}
                      key={item.id ?? index}
                      sid={sid}
                      {...item}
                    />
                  ))}
                </div>
              ) : (
                <div className="account-state account-state-empty">
                  <div className="account-empty-icon">
                    <i className="fas fa-inbox" aria-hidden="true" />
                  </div>
                  <h3>No rewards found</h3>
                  <p>
                    No customer rewards were found for the selected month.
                    Try selecting another month.
                  </p>
                </div>
              )}

              {showData && (
                <AccountDetailsModel
                  transectionHistory={transectionHistory}
                  isAccountDetails={isAccountDetails}
                  onClose={() => this.setState({ showData: false })}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
}
