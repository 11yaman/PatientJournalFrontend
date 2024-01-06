import { useState } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = 'GET', data = null, token = null, additionalHeaders = {}, contentType = 'application/x-www-form-urlencoded') => {
    setLoading(true);
    setError(null);
  
    const headers = {
      'Content-Type': contentType,
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const mergedHeaders = { ...headers, ...additionalHeaders };
  
    let config;
  
    if (method === 'GET') {
      config = {
        method,
        headers: mergedHeaders,
      };
    } else {
      let body;
  
      if (contentType === 'application/json') {
        body = JSON.stringify(data);
      } else {
        const requestBody = new URLSearchParams();
  
        if (data) {
          for (const key in data) {
            requestBody.append(key, data[key]);
          }
        }
  
        body = requestBody.toString();
      }
  
      config = {
        method,
        headers: mergedHeaders,
        body,
      };
    }
  
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

  const get = async (url, token = null, additionalHeaders = {}) => {
    return fetchData(url, 'GET', null, token, additionalHeaders);
  };

  const post = async (url, data, token = null, additionalHeaders = {}, contentType = 'application/json') => {
    return fetchData(url, 'POST', data, token, additionalHeaders, contentType);
  };

  return { get, post, loading, error };
};

export default useApi;
