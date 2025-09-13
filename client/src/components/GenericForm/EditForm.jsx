import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GenericForm, LoadingIndicator } from "@components";
import { ModuleNotFound } from "@screens";
import { extractEnumsId } from "@services";

function EditForm({ schema, route, identifier, name, method }) {
  const { id: uid } = useParams();
  const { data, isLoading } = useQuery(route, {
    select: (data) =>
      extractEnumsId(data.find((e) => e[identifier].toString() === uid)),
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
      isAccepted={!!data.acceptedByDestinationAt}
      method={method}
    />
  );
}

export default EditForm;
