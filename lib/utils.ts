export function calculateAverageRating(ratings: { rating: number }[]): string | null {
  if (!ratings || ratings.length === 0) return null;
  const sum = ratings.reduce((total, r) => total + r.rating, 0);
  return (sum / ratings.length).toFixed(1);
}