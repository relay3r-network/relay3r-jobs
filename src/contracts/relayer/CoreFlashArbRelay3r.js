const config = {
    address: "0x7A2369056c20270778651cba53F5A860ed2E29Cc",
    abi: [
        "function hasMostProfitableStrat () external view returns (bool)",
        "function getMostProfitableStratWithToken () external view returns ( uint256, address )",
        "function work (uint256 strat, address rewardToken) external",
    ],
};
module.exports = config;
