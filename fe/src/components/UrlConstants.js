const BASE_URL = "http://localhost:8090/";
export const GET_PURCHASE_BY_CUSTOMER = BASE_URL + "rewardByUserId/";
export const GET_ALL_REWARDS = BASE_URL + "allRewards";
export const GET_TOTAL_REWARDS = BASE_URL + "totalRewardCount";
export const SAVE_PURCHASE = BASE_URL + "save";

export const createQueryStr = function (json) {
  return (
    "?" +
    Object.keys(json)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&")
  );
};
