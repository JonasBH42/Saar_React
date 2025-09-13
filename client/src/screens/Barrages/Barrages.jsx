import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import {
  AddButton,
  DeleteManyWithDialog,
  GenericDataGrid,
  EditMultipleButton,
  ExcelButton,
} from "@components";
import {
  barrageFields,
  MODULES_ROUTES,
  REFETCHING_INTERVAL,
  ROWS_PER_TABLE_PAGE,
  SCREEN_ROUTES,
} from "@constants";
import {
  customFilterQuery,
  getEditableFields,
  returnParsedItemFromLocalStorage,
} from "@services";
import { selectedBarragesState } from "@states";
import { barragesTableColumns, invisibleColumns } from "./barragesColumns";
import "@styles/main-page.css";

const API_ROUTE = MODULES_ROUTES.barrages;

function Barrages() {
  const [barrageList, setBarrageList] = useRecoilState(selectedBarragesState);
  const [barragesFilters, setBarragesFilters] = useState(
    returnParsedItemFromLocalStorage(`${API_ROUTE}Grid`)?.filterModel
  );
  const [pageOption, setPageOption] = useState({
    page: 0,
    rowsPerPage: ROWS_PER_TABLE_PAGE,
  });
  const [order, setOrder] = useState([]);

  const { data, isLoading, refetch } = useQuery(
    [API_ROUTE, customFilterQuery(barragesFilters, pageOption, order)],
    {
      refetchInterval: REFETCHING_INTERVAL,
      select: ([result, total]) => ({
        result: result.map((barrage) => {
          return {
            ...barrage,
            sourceName: barrage.sourceName?.Name,
            missileCategory: barrage.missileCategory?.Name,
            missileType: barrage.missileType?.Name,
            sourceCountry: barrage.sourceCountry?.Name,
            longitude: Number(barrage.longitude),
            latitude: Number(barrage.latitude),
            isAcceptedByShual: !!barrage.acceptedByDestinationAt,
            sendTimeScheduledAt:
              barrage.sendTimeScheduledAt &&
              new Date(barrage.sendTimeScheduledAt),
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
        <span className={"headline"}>מטחים</span>
        <div className={"buttonsBar"}>
          {barrageList.length > 0 && (
            <>
              <DeleteManyWithDialog
                path={API_ROUTE}
                onSuccess={refetch}
                identifierList={barrageList}
              />
              <EditMultipleButton
                path={API_ROUTE}
                onSuccess={refetch}
                identifierList={barrageList}
                schema={getEditableFields(barrageFields)}
              />
            </>
          )}
          <AddButton link={SCREEN_ROUTES.new} />
          <ExcelButton link={SCREEN_ROUTES.load} />
        </div>
      </div>
      <GenericDataGrid
        setOrder={setOrder}
        rowCount={data?.total}
        page={pageOption.page}
        setPage={(page) => setPageOption((prev) => ({ ...prev, page }))}
        loading={isLoading}
        setFilter={setBarragesFilters}
        treeData={false}
        rows={data?.result ?? []}
        columns={barragesTableColumns(API_ROUTE, refetch)}
        selectionModel={barrageList}
        onSelectionModelChange={(ids) => setBarrageList(ids)}
        dataKey={API_ROUTE}
        identifierKey={"uid"}
        invisibleColumns={invisibleColumns}
        defaultSort={[{ field: "sendTimeScheduledAt", sort: "asc" }]}
      />
    </div>
  );
}

export default Barrages;
