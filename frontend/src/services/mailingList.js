import {apiFetch }from "./api";

export const subscribeToMailingList = async (email) => {
  const data = await apiFetch("/mailingList/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  return data;
};

export const getMailingList = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.isActive !== undefined) {
    params.append('isActive', filters.isActive);
  }
  
  const queryString = params.toString();
  const endpoint = `/mailingList${queryString ? `?${queryString}` : ''}`;
  
  const data = await apiFetch(endpoint);
  return data.entries;
};

export const deleteSubscriber = async (subscriberId) => {
  const data = await apiFetch(`/mailingList/${subscriberId}`, {
    method: "DELETE",
  });
  return data;
};
