const config = {
  address: "0x55C5C6dd599e11391559A7cAC1AB5F04A2401b3f",
  abi: [
    "function workBatch (uint[] memory orderList) external",
    "function workSolo (uint order) external",
    "function getExecutableOrdersList() external view returns (uint[] memory)",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
