const config = {
  address: "0x706a2effb344b9dE26A1816ca278255db22BFFdb",
  abi: [
    "function CoreArb (  ) external view returns ( address )",
    "function CoreToken (  ) external view returns ( address )",
    "function RL3R (  ) external view returns ( address )",
    "function owner (  ) external view returns ( address )",
    "function profitableCount (  ) external view returns ( uint256 )",
    "function profitableStrats (  ) external view returns ( uint256[] )",
    "function renounceOwnership (  ) external",
    "function setCoreArbAddress ( address newContract ) external",
    "function transferOwnership ( address newOwner ) external",
    "function workBatch ( uint256[] profitable ) external",
    "function workable (  ) external view returns ( bool )",
  ],
};
module.exports = config;
