// Example of api.js
const API_URL = 'http://localhost:5000/api';  // Backend API endpoint

export const fetchIssues = async () => {
  const response = await fetch(`${API_URL}/issues`);
  const data = await response.json();
  return data;
};

export const createIssue = async (issueData) => {
  const response = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(issueData),
  });
  return await response.json();
};
