import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ModuleNotFound } from "@screens";
import { GenericForm, LoadingIndicator } from "@components";
import { extractEnumsId } from "@services";

function DuplicateForm({ schema, route, identifier, name, method, isEvolve }) {
  const { id } = useParams();
  const { data, isLoading } = useQuery(route, {
    select: (data) => {
      const objToDuplicate = {
        ...data.find((e) => e[identifier].toString() === id),
      };
      if (!isEvolve) {
        delete objToDuplicate.simulatorId;
        delete objToDuplicate.shualId;
      }
      delete objToDuplicate.uid;
      delete objToDuplicate.acceptedByDestinationAt;

      return extractEnumsId(objToDuplicate);
    },
  });

  if (isLoading) return <LoadingIndicator />;
  if (!data) return <ModuleNotFound />;
  return (
    <GenericForm
      route={route}
      defaultValues={data}
      formSchema={schema}
      title={data[name]}
      closeLink={`/home/${route}`}
      method={method}
    />
  );
}

export default DuplicateForm;
