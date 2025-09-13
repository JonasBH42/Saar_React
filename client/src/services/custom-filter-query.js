export const customFilterQuery = (filters, pageOption, order) => ({
  params: {
    filters: {
      items: filters?.items.map((filter) => ({
        ...filter,
        columnField:
          filter.columnField === "isAcceptedByShual"
            ? "acceptedByDestinationAt"
            : filter.columnField,
      })),
      linkOperator: filters?.linkOperator,
    },
    pageOption,
    order,
  },
});
