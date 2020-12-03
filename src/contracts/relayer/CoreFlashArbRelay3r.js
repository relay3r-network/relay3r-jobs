const config = {
    address: "0x2620825DF4365Fd6B9389B51eac48EFc5da7F3BC",
    abi: [
        "function hasMostProfitableStrat () external view returns (bool)",
        "function getMostProfitableStratWithToken () external view returns ( uint256, address )",
        "function work (uint256 strat, address rewardToken) external",
    ],
};
module.exports = config;
