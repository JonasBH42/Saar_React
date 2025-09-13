import { useQuery } from "react-query";

export function useBarrageLabels() {
  const { data } = useQuery([`barrages/enumsLabels`], {
    staleTime: Infinity,
  });

  return data;
}
