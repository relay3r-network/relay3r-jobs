const config = {
    address: "0x054A87DdFdE3ccb5DDB03739375329BcC1b03203",
    abi: [
      "function vaults (  ) external view returns ( address[] _vaults )",
      "function earn(address _vault) external",
      "function workable ( address _vault ) external returns ( bool )"
    ],
};
module.exports = config;
