import { useEffect, useState } from 'react';
import fallback from '../data/portfolio.json';
import { fetchPortfolio } from '../services/portfolioApi.js';

export default function usePortfolio() {
  // Render the complete page immediately, then refresh from the small backend.
  const [portfolio, setPortfolio] = useState(fallback);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetchPortfolio(controller.signal)
      .then(setPortfolio)
      .catch(() => {
        /* Static deployments intentionally use the local fallback. */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  return portfolio;
}
