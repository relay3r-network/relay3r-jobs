const config = {
  address: "0xe7F4ab593aeC81EcA754Da1B3B7cE0C42a13Ec0C",
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
