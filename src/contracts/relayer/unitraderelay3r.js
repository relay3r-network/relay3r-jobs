const config = {
  address: "0x743bbe8416a9f1a6ff71d19f1e39F287C8225459",
  abi: [
    "function workBatch (uint[] memory orderList) external",
    "function workSolo (uint order) external",
    "function getExecutableOrdersList() external view returns (uint[] memory)",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
