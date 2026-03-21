export const calculateReadTime = (content) => {
  if (!content) return "1 min read";
  
  const wordsPerMinute = 200;
  const text = typeof content === 'string' ? content : content.join(' ');
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
};
