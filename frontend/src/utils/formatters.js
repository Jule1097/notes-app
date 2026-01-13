export function formatCategories(categories) {
  if (!categories) return '';
  if (Array.isArray(categories) && categories.every(c => typeof c === 'string')) {
    return categories.join(', ');
  }
  if (Array.isArray(categories)) {
    return categories.map(item => item?.categories?.name || item?.name || String(item)).join(', ');
  }
  return String(categories);
}

export function getId(obj) {
  return obj?.id ?? obj?._id ?? null;
}