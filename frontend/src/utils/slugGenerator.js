export const generateSlug = (title) => {
  if (!title) return "";
  
  // Take first 5 words
  const words = title
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .slice(0, 5);
  
  // Join with dashes and remove special characters
  const slug = words
    .join("-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  
  return slug;
};
