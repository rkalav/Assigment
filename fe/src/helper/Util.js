import moment from "moment";

export const YEARS = [];
export const MONTHS = [
  { label: "January", id: 1 },
  { label: "February", id: 2 },
  { label: "March", id: 3 },
  { label: "April", id: 4 },
  { label: "May", id: 5 },
  { label: "June", id: 6 },
  { label: "July", id: 7 },
  { label: "August", id: 8 },
  { label: "September", id: 9 },
  { label: "October", id: 10 },
  { label: "November", id: 11 },
  { label: "December", id: 12 },
];
export const SEARCH_DATE = { year: "", month: "" };

function calcuateDaysandMonth(monthYear) {
  const dt = monthYear.split("-");
  const month = parseInt(dt[1]);
  const year = parseInt(dt[0]);
  return new Date(year, month, 0);
}

export const getDays = function (monthYear) {
  const days = calcuateDaysandMonth(monthYear);
  const startDate = new Date();
  startDate.setMonth(days.getMonth());
  startDate.setFullYear(days.getFullYear());
  startDate.setDate(1);
  const endDate = new Date();
  endDate.setMonth(days.getMonth());
  endDate.setDate(days.getDate());
  endDate.setFullYear(days.getFullYear());
  return { start: moment(startDate).format("MM/DD/YYYY"), end: moment(endDate).format("MM/DD/YYYY") };
};

export const formatDate = function (timestamp) {
  if (timestamp) return moment(timestamp).format("MM/DD/YYYY");
  return "";
};

function setUpYear() {
  const START = 1970;
  const END = new Date().getFullYear();
  SEARCH_DATE.year = END;
  SEARCH_DATE.month = new Date().getMonth() + 1;
  for (let i = START; i <= END; i++) {
    YEARS.push(i);
  }
}
setUpYear();


export const post = function (url, data, callback) {
  const options = {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  };
  callApi(url, options, callback);
};

export const get = function (url, callback) {
  const options = {
    method: "GET",
    headers: getHeaders(),
  };
  callApi(url, options, callback);
};

const callApi = function (url, requestOptions, cb) {
  window.loader(true);
  let status;
  fetch(url, requestOptions)
    .then((response) => {
      status = response.status;
      return response.text();
    })
    .then((result) => cb(result, null, status))
    .catch((error) => cb(null, error, status))
    .finally(() => {
      window.loader();
    });
};

const getHeaders = function () {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "*/*");
  headers.append("Sec-Fetch-Site", "same-site");
  headers.append("Sec-Fetch-Dest", "empty");
  return headers;
};