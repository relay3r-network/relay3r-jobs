const config = {
  address: "0xF647c8E117115fCAEf2A2b28060b258437d054B2",
  abi: [
    "function workBatch (uint[] memory orderList) external",
    "function getExecutableOrdersList() external view returns (uint[] memory)",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
