const config = {
  address: "0xee334356dF4F75a3902346c88a819cDE41F896E6",
  abi: [
    "function workBatch (uint[] memory orderList) external",
    "function workSolo (uint order) external",
    "function getExecutableOrdersList() external view returns (uint[] memory)",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
