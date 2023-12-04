import { useState } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = 'GET', data = null, token = null) => {
    setLoading(true);
    setError(null);

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Basic ${token}`;
    }

    const config = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    };

    try {
      const response = await fetch(`${url}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      return result;
    } catch (error) {
      setError('An error occurred while fetching data.');
      setLoading(false);
      console.error('API Error:', error);
      return null;
    }
  };

  const get = async (url, token = null) => {
    return fetchData(url, 'GET', null, token);
  };

  const post = async (url, data, token = null) => {
    return fetchData(url, 'POST', data, token);
  };

  return { get, post, loading, error };
};

export default useApi;
