import { useQuery } from "react-query";

export function useEnvironment(defaultValues) {
  const { data } = useQuery(["client-config"], {
    staleTime: Infinity,
  });

  return { ...defaultValues, ...data };
}
