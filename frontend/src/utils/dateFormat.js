export const formatDate = (date) => {
  if (!date) return "N/A";
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return "N/A";
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObj.toLocaleDateString('en-US', options);
};

export const formatDateTime = (date) => {
  if (!date) return "N/A";
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return "N/A";
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return dateObj.toLocaleDateString('en-US', options);
};
