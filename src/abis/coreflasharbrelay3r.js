const config = {
  address: "0xaeDC35E4307E1e3eE6d35AF3A69eCA01542D7cea",
  abi: [
    "function CoreArb (  ) external view returns ( address )",
    "function CoreToken (  ) external view returns ( address )",
    "function RLR (  ) external view returns ( address )",
    "function getRewardToken ( uint256 strat ) external view returns ( address )",
    "function getTokenBalance ( address tokenAddress ) external view returns ( uint256 )",
    "function owner (  ) external view returns ( address )",
    "function profitableCount (  ) external view returns ( uint256 )",
    "function profitableStratsWithTokens (  ) external view returns ( uint[], address[] )",
    "function recoverERC20 ( address token ) external",
    "function renounceOwnership (  ) external",
    "function setCoreArbAddress ( address newContract ) external",
    "function transferOwnership ( address newOwner ) external",
    "function getMostProfitableStratWithToken (  ) external view returns ( uint256, address )",
    "function hasMostProfitableStrat (  ) external view returns ( bool )",
    "function work ( uint256 strat, address rewardToken ) external",
    "function workBatch ( uint[] profitable, address[] rewardTokens ) external",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
