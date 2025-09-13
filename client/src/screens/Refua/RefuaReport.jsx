import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { customFilterQuery, returnParsedItemFromLocalStorage } from "@services";
import { AddButton, GenericDataGrid } from "@components";
import {
  REFETCHING_INTERVAL,
  ROWS_PER_TABLE_PAGE,
  SCREEN_ROUTES,
} from "@constants";
import { reportColumns } from "./TableColumns/reportColumns";
import "@styles/main-page.css";

function RefuaReport({ title, API_ROUTE, type }) {
  const [reportsFilters, setReportsFilters] = useState(
    returnParsedItemFromLocalStorage(`${API_ROUTE}/reports/${type}Grid`)
      ?.filterModel
  );
  const [pageOption, setPageOption] = useState({
    page: 0,
    rowsPerPage: ROWS_PER_TABLE_PAGE,
  });
  const [order, setOrder] = useState([]);

  const { data, isLoading, refetch } = useQuery(
    [
      `${API_ROUTE}/reports/${type}`,
      customFilterQuery(reportsFilters, pageOption, order),
    ],
    {
      refetchInterval: REFETCHING_INTERVAL,
      select: ([result, total]) => ({
        result: result.map((report) => ({
          ...report,
          sendTimeScheduledAt:
            report.sendTimeScheduledAt && new Date(report.sendTimeScheduledAt),
        })),
        total,
      }),
    }
  );

  const navigate = useNavigate();

  if (!data && !isLoading) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
      <div className={"header"}>
        <span className={"headline"}>{title}</span>
        <div className={"buttonsBar"}>
          <AddButton link={`reports/${type}/${SCREEN_ROUTES.new}`} />
        </div>
      </div>
      <div
        style={{
          height: "76vh",
        }}
      >
        <GenericDataGrid
          setOrder={setOrder}
          rowCount={data?.total}
          page={pageOption.page}
          setPage={(page) => setPageOption((prev) => ({ ...prev, page }))}
          filter={reportsFilters}
          setFilter={setReportsFilters}
          treeData={false}
          checkboxSelection={false}
          rows={data?.result ?? []}
          columns={reportColumns(API_ROUTE, refetch)}
          dataKey={`${API_ROUTE}/reports/${type}`}
          identifierKey={"uid"}
          defaultSort={[{ field: "sendTimeScheduledAt", sort: "asc" }]}
          onRowDoubleClick={({ id }) => navigate(`reports/${type}/${id}`)}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default RefuaReport;
