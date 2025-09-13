import { useQuery } from "react-query";

export function useEventLabels() {
  const { data } = useQuery([`events/enumsLabels`], {
    staleTime: Infinity,
  });

  return data;
}
