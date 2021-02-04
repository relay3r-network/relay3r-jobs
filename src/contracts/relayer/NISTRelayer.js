const config = {
    address: "0x20a099b164A647D7F102ff05274C9d91CB57AFd2",
    abi: [
      "function workable () external view returns ( bool )",
      "function getData() external view returns (address[] memory eligible_addresses, uint256 total_reward)",
      "function work(address[] memory stakers, uint256 tokens_to_liquidate) external",
    ],
  };
module.exports = config;
