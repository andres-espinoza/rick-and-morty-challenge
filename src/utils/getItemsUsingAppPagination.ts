const getItemsUsingAppPagination = <T>(
  pag: number,
  data: T[],
  amountPerPage = 20
): T[] => {
  if (!data || data.length < 1) return [];
  const from = amountPerPage * pag - amountPerPage;
  const to = amountPerPage * pag;
  return data.map((d) => d).slice(from, to);
};

export default getItemsUsingAppPagination;
