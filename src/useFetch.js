import { useEffect, useState } from 'react';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) throw new Error('Could not get the data from that source');
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
        setIsPending(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') console.log('Aborted');
        setError(err.message);
        setIsPending(false);
      });
    return () => abortController.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
