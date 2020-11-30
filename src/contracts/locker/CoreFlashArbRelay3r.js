const config = {
    address: "0x2400cd0f6e2829FCE228e6F659500cA6ade87fCC",
    abi: [
        "function hasMostProfitableStrat () external view returns (bool)",
        "function getMostProfitableStratWithToken () external view returns ( uint256, address )",
        "function work (uint256 strat, address rewardToken) external",
    ],
};
module.exports = config;
