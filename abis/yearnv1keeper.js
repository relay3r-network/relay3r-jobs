const config = {
  address: "0x9929fda713F40b385D9Af169c4441a18986D687B",
  abi: [
    "function BASE (  ) external view returns ( uint256 )",
    "function KP3R (  ) external view returns ( address )",
    "function THRESHOLD (  ) external view returns ( uint256 )",
    "function shouldRebalance ( address _token ) external view returns ( bool )",
    "function tokens (  ) external view returns ( address[] )",
    "function work (  ) external",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
