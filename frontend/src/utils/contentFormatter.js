// Legacy function - kept for backward compatibility
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

// Legacy function - kept for backward compatibility
export const formatArrayToContent = (contentArray) => {
  if (!contentArray || !Array.isArray(contentArray)) return "";
  
  // Join array elements with double line breaks
  return contentArray.join("\n\n");
};

// NEW: Convert content for editor (handles both old array and new HTML formats)
export const formatContentForEditor = (content) => {
  if (!content) return '';
  
  // If it's an array (old format), convert to HTML
  if (Array.isArray(content)) {
    return content.map(paragraph => `<p>${paragraph}</p>`).join('');
  }
  
  // If it's already HTML (new format), return as is
  return content;
};

// NEW: Content is already in HTML format, just return it
export const formatContentForStorage = (htmlContent) => {
  return htmlContent || '';
};

// NEW: Format content for display on frontend
export const formatContentForDisplay = (content) => {
  // Return as is - BlogPost component will handle rendering
  return content;
};
