import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { AddButton, DeleteManyWithDialog, GenericDataGrid } from "@components";
import {
  MODULES_ROUTES,
  REFETCHING_INTERVAL,
  ROWS_PER_TABLE_PAGE,
  SCREEN_ROUTES,
} from "@constants";
import { selectedSirenEventsState } from "@states";
import { customFilterQuery, returnParsedItemFromLocalStorage } from "@services";
import { sirenEventsColumns, invisibleColumns } from "./sirenEventsColunms";
import "@styles/main-page.css";

const API_ROUTE = MODULES_ROUTES.sirens;

function Sirens() {
  const [sirenEventsList, setSirenEventsList] = useRecoilState(
    selectedSirenEventsState
  );
  const [sirensFilters, setSirensFilters] = useState(
    returnParsedItemFromLocalStorage(`${API_ROUTE}Grid`)?.filterModel
  );
  const [pageOption, setPageOption] = useState({
    page: 0,
    rowsPerPage: ROWS_PER_TABLE_PAGE,
  });
  const [order, setOrder] = useState([]);

  const { data, isLoading, refetch } = useQuery(
    [API_ROUTE, customFilterQuery(sirensFilters, pageOption, order)],
    {
      refetchInterval: REFETCHING_INTERVAL,
      select: ([result, total]) => ({
        result: result.map((sirenEvent) => ({
          ...sirenEvent,
          relatedSirens: sirenEvent.relatedSirens.map((siren) => siren.name),
          status: sirenEvent.status,
        })),
        total,
      }),
    }
  );

  if (!data && !isLoading) return null;
  return (
    <div className={"page"}>
      <div className={"header"}>
        <span className={"headline"}>אירועי צופרים</span>
        <div className={"buttonsBar"}>
          {sirenEventsList.length > 0 && (
            <DeleteManyWithDialog
              path={API_ROUTE}
              onSuccess={refetch}
              identifierList={sirenEventsList}
            />
          )}
          <AddButton link={SCREEN_ROUTES.new} />
        </div>
      </div>
      <GenericDataGrid
        setOrder={setOrder}
        rowCount={data?.total}
        page={pageOption.page}
        setPage={(page) => setPageOption((prev) => ({ ...prev, page }))}
        loading={isLoading}
        setFilter={setSirensFilters}
        rows={data?.result ?? []}
        columns={sirenEventsColumns(API_ROUTE, refetch)}
        selectionModel={sirenEventsList}
        onSelectionModelChange={(ids) => setSirenEventsList(ids)}
        dataKey={API_ROUTE}
        identifierKey={"uid"}
        invisibleColumns={invisibleColumns}
        defaultSort={[{ field: "uid", sort: "asc" }]}
        treeData={false}
      />
    </div>
  );
}

export default Sirens;
