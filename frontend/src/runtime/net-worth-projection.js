export function projectNetWorth({ assets = [], liabilities = [] } = {}) {
  const activeAssets = assets.filter((asset) => asset?.status !== "archived" && asset?.status !== "inactive");
  const activeLiabilities = liabilities.filter((liability) => liability?.status !== "archived" && liability?.status !== "inactive");
  const currencies = new Set([...activeAssets.map((asset) => asset.currency), ...activeLiabilities.map((liability) => liability.currency)].filter(Boolean));
  const totalAssets = activeAssets.reduce((total, asset) => total + Number(asset.currentValue || 0), 0);
  const totalLiabilities = activeLiabilities.reduce((total, liability) => total + Number(liability.outstandingBalance || 0), 0);
  return Object.freeze({
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
    currency: currencies.size === 1 ? [...currencies][0] : "MULTI",
    multiCurrency: currencies.size > 1,
    assetCount: activeAssets.length,
    liabilityCount: activeLiabilities.length,
  });
}
