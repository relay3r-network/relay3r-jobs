const config = {
  address: "0x73353801921417F465377c8d898c6f4C0270282C",
  abi: [
    "function KP3R (  ) external view returns ( address )",
    "function lastObservation ( address pair ) external view returns ( tuple )",
    "function minKeep (  ) external view returns ( uint256 )",
    "function pairs (  ) external view returns ( address[] )",
    "function periodSize (  ) external view returns ( uint256 )",
    "function update ( address tokenA, address tokenB ) external returns ( bool )",
    "function updateFor ( uint256 i, uint256 length ) external returns ( bool updated )",
    "function updatePair ( address pair ) external returns ( bool )",
    "function weekly ( address tokenIn, uint256 amountIn, address tokenOut, uint256 points ) external view returns ( uint256[] )",
    "function work (  ) external",
    "function workForFree (  ) external",
    "function workable (  ) external view returns ( bool )",
    // "function workable ( address pair ) external view returns ( bool )",
  ],
};
module.exports = config;
