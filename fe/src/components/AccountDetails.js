import React from "react";
import { formatDate, MONTHS, SEARCH_DATE, YEARS } from "../helper/Util";

export const AccountInfo = function (props) {
  const onClickItem = () => {
    props.onSelectCustomer(props.userId);
  };
  return (
    <div className={props.userId === props.sid ? "account-item mt-2 p-2 shadow-sm bg-white rounded active" : "account-item mt-2 p-2 shadow-sm bg-white rounded"} onClick={onClickItem}>
      <div className="row" style={{ width: "100%" }}>
        <div className="col">{props.userId}</div>
        <div className="col">
          Rewards : {props.rewards}
          <span className="expend-Arrow">
            <i className="fa fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export const AccountDetails = function (props) {
  return (
    <tr>
      <td>{props.amount}</td>
      <td>{formatDate(props.date)}</td>
      <td>{props.reward}</td>
    </tr>
  );
};

export const Search = function (props) {
  const onDateChange = (e) => {
    if (e.target.name === "YEAR") {
      SEARCH_DATE.year = e.target.value;
    } else {
      SEARCH_DATE.month = e.target.value;
    }
    const date = SEARCH_DATE.year + "-" + SEARCH_DATE.month;
    props.updateState({ selectedDate: date });
  };
  return (
    <div className="col-12 mb-4">
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <span>Year </span>
            <select name="YEAR" value={SEARCH_DATE.year} onChange={onDateChange} className="form-control d-inline-flex" style={{ width: "80%" }}>
              {YEARS.map((e, i) => (
                <Options key={i} isLabel={false} text={e} />
              ))}
            </select>
          </div>
          {/* <input className="form-control" type="year" value={props.selectedDate} onChange={onDateChange} /> */}
        </div>
        <div className="col-4">
          <div className="form-group">
            <span>Month </span>
            <select name="MONTH" value={SEARCH_DATE.month} onChange={onDateChange} className="form-control d-inline-flex" style={{ width: "80%" }}>
              {MONTHS.map((e, i) => (
                <Options key={i} isLabel={true} {...e} />
              ))}
            </select>
          </div>
        </div>
        <div className="col-4">
          <button className="btn btn-info btn-md" style={{ backgroundColor: '#a1542e' }} onClick={props.onSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const Options = (props) => {
  if (props.isLabel) return <option value={props.id}>{props.label}</option>;
  return <option value={props.text}>{props.text}</option>;
};

export const SearchInfo = function (props) {
  return (
    <div className="col-12">
      <span>Total : {props.total}</span>
      <span className="ml-5">Month : {props.selectedDate}</span>
    </div>
  );
};
