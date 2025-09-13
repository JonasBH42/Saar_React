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
import { selectedForcesState } from "@states";
import { customFilterQuery, returnParsedItemFromLocalStorage } from "@services";
import { forcesTableColumns, invisibleColumns } from "./forcesColumns";
import "@styles/main-page.css";

const API_ROUTE = MODULES_ROUTES.forces;

function Forces() {
  const [forcesList, setForcesList] = useRecoilState(selectedForcesState);
  const [forcesFilters, setForcesFilters] = useState(
    returnParsedItemFromLocalStorage(`${API_ROUTE}Grid`)?.filterModel
  );
  const [pageOption, setPageOption] = useState({
    page: 0,
    rowsPerPage: ROWS_PER_TABLE_PAGE,
  });
  const [order, setOrder] = useState([]);
  const { data, isLoading, refetch } = useQuery(
    [API_ROUTE, customFilterQuery(forcesFilters, pageOption, order)],
    {
      refetchInterval: REFETCHING_INTERVAL,
      select: ([result, total]) => ({
        result: result.map((force) => {
          return {
            ...force,
            FORCE_TYPE: force.FORCE_TYPE?.Name,
            longitude: Number(force.longitude),
            latitude: Number(force.latitude),
            isAcceptedByShual: !!force.acceptedByDestinationAt,
            sendTimeScheduledAt:
              force.sendTimeScheduledAt && new Date(force.sendTimeScheduledAt),
            TIME: force.TIME && new Date(force.TIME),
          };
        }),
        total,
      }),
    }
  );

  if (!data && !isLoading) return null;
  return (
    <div className={"page"}>
      <div className={"header"}>
        <span className={"headline"}>כוחות</span>
        <div className={"buttonsBar"}>
          {forcesList.length > 0 && (
            <DeleteManyWithDialog
              path={API_ROUTE}
              onSuccess={refetch}
              identifierList={forcesList}
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
        setFilter={setForcesFilters}
        rows={data?.result ?? []}
        columns={forcesTableColumns(API_ROUTE, refetch)}
        selectionModel={forcesList}
        onSelectionModelChange={(ids) => setForcesList(ids)}
        dataKey={API_ROUTE}
        identifierKey={"FORCE_IP"}
        invisibleColumns={invisibleColumns}
        defaultSort={[{ field: "TIME", sort: "asc" }]}
        loading={isLoading}
      />
    </div>
  );
}

export default Forces;
