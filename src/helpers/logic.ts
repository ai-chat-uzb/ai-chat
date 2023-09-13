export const paginationCount = (count: number) => {
  const residual = count % 10;

  return (count - residual) / 10 + (residual ? 1 : 0);
};
