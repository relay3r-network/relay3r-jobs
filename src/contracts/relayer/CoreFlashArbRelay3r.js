const config = {
    address: "0xaeDC35E4307E1e3eE6d35AF3A69eCA01542D7cea",
    abi: [
        "function hasMostProfitableStrat () external view returns (bool)",
        "function getMostProfitableStratWithToken () external view returns ( uint256, address )",
        "function work (uint256 strat, address rewardToken) external",
    ],
};
module.exports = config;
