import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for fetching data from API with loading and error states
 * @param {string} url - The API endpoint URL
 * @returns {object} - { data, loading, error }
 */
export default function useApiData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(url, {
          timeout: 10000, // 10 second timeout
        });

        if (response.data.success) {
          setData(response.data);
        } else {
          setError(response.data.error || 'Unknown error occurred');
        }
      } catch (err) {
        if (err.response) {
          // Server responded with error status
          setError(
            err.response.data?.error || `Error: ${err.response.status}`
          );
        } else if (err.request) {
          // Request made but no response
          setError('No response from server. Please check your connection.');
        } else {
          // Error in request setup
          setError(err.message || 'Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
}