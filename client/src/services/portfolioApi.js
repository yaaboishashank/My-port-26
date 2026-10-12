const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function fetchPortfolio(signal) {
  const response = await fetch(`${baseUrl}/api/v1/portfolio`, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Portfolio API returned ${response.status}.`);
  const { data } = await response.json();
  // A malformed/old API must not take down the bundled portfolio.
  if (
    !data?.profile?.email ||
    !Array.isArray(data.projects) ||
    !Array.isArray(data.skillGroups) ||
    !Array.isArray(data.profiles) ||
    !Array.isArray(data.education) ||
    !Array.isArray(data.technologies)
  ) {
    throw new Error('Unexpected portfolio API response.');
  }
  return data;
}
