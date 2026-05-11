export const calculateReadTime = (content) => {
  if (!content) return "1 min read";
  
  const wordsPerMinute = 200;
  
  // Convert to string if array (old format)
  let text = typeof content === 'string' ? content : content.join(' ');
  
  // Strip HTML tags for accurate word count
  text = text.replace(/<[^>]*>/g, ' ');
  
  // Count words
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  
  return `${minutes} min read`;
};
