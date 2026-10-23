export const formatPrice = (A) => `₹${Number(A || 0).toLocaleString("en-IN")}`;

export const formatPriceShort = (A) => {
  const e = Number(A || 0);
  if (e >= 100000) {
    return `₹${Number((e / 100000).toFixed(2))} Lakh`;
  }
  return formatPrice(e);
};

export const formatShortDateTime = (A) => {
  if (A) {
    return new Date(A).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return "";
};

export const formatDateTime = (createdAt) => {
  if (createdAt) {
    return new Date(createdAt).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return "";
};

export const formatDate = (
  date,
  e = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  },
) => {
  if (date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", e);
  }
  return "";
};

export const todayISO = () => {
  const A = new Date();
  return new Date(A.getTime() - A.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
};

export const orderTitle = (type, item) => {
  if (type === "sell") {
    return [
      item.model,
      [item.storage, item.ram && `${item.ram} RAM`].filter(Boolean).join(" • "),
    ]
      .filter(Boolean)
      .join(" — ");
  }
  return item.product;
};
