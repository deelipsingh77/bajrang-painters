export const getCategoryColor = (
  category: string,
  colorMap: Record<string, string>
) => {
  if (!category) return "bg-gray-500";

  // Try direct lookup first
  const normalizedCategory = category.toLowerCase();
  if (colorMap[normalizedCategory]) {
    return colorMap[normalizedCategory];
  }

  // Try reverse lookup - check if any key is a substring of the category
  const partialMatch = Object.keys(colorMap).find((key) =>
    normalizedCategory.includes(key.toLowerCase())
  );

  return partialMatch ? colorMap[partialMatch] : "bg-gray-500";
};

export const getCategoryLabel = (
  category: string,
  labelMap: Record<string, string>
) => {
  if (!category) return "Other";

  // Try direct lookup first
  const normalizedCategory = category.toLowerCase();
  if (labelMap[normalizedCategory]) {
    return labelMap[normalizedCategory];
  }

  // Try reverse lookup - check if any key is a substring of the category
  const partialMatch = Object.keys(labelMap).find((key) =>
    normalizedCategory.includes(key.toLowerCase())
  );

  return partialMatch
    ? labelMap[partialMatch]
    : category.charAt(0).toUpperCase() + category.slice(1);
};
