const config = {
    address: "0x13dAda6157Fee283723c0254F43FF1FdADe4EEd6",
    abi: [
      "function strategies() external view  returns (address[] memory _strategies)",
      "function harvestable(address _strategy) external view returns (bool)",
      "function harvest(address _strategy) external",
      "function tendable(address _strategy) external view returns (bool)",
      "function tend(address _strategy) external",
    ],
  };
module.exports = config;