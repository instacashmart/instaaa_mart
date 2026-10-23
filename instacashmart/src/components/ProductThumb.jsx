export function ProductThumb({ product, boxClass, iconClass }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={`${boxClass} object-cover`}
      />
    );
  }
  return (
    <span
      className={`${boxClass} flex items-center justify-center bg-slate-100 text-slate-900`}
    >
      <i className={`fa-solid ${product.icon} ${iconClass}`} />
    </span>
  );
}
