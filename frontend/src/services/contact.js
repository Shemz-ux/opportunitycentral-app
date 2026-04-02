import { apiFetch } from "./api";
 
export const submitContactForm = async (contactData) => {
  const data = await apiFetch('/contact/submit', {
    method: "POST",
    body: JSON.stringify(contactData),
  });
  return data;
};