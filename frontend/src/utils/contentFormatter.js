export const formatContentToArray = (content) => {
  if (!content) return [];
  
  // If already an array, return as is
  if (Array.isArray(content)) return content;
  
  // Split by double line breaks (paragraphs)
  const paragraphs = content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  return paragraphs;
};

export const formatArrayToContent = (contentArray) => {
  if (!contentArray || !Array.isArray(contentArray)) return "";
  
  // Join array elements with double line breaks
  return contentArray.join("\n\n");
};
