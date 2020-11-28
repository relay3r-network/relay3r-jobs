const config = {
  address: "0x34bcA098B78E2291E6b8E321Cc9bfB9F451713A3",
  abi: [
    "function workBatch (uint[] memory orderList) external",
    "function getExecutableOrdersList() external view returns (uint[] memory)",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
