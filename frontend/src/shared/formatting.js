export const formatNullable = (value, fallback = "N/A") => value ?? fallback;
export const formatNumber = (value) => new Intl.NumberFormat("zh-TW").format(Number(value || 0));
export const formatCurrency = (value, currency = "TWD") => new Intl.NumberFormat("zh-TW", { style: "currency", currency }).format(Number(value || 0));
export const formatPercentage = (value) => `${Number(value || 0).toFixed(2)}%`;
export const formatDate = (value) => value ? new Intl.DateTimeFormat("zh-TW").format(new Date(value)) : "N/A";
export const formatFileSize = (bytes) => `${Math.ceil(Number(bytes || 0) / 1024)} KB`;
