import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useGridApiRef } from "@mui/x-data-grid-pro";
import {
  AddButton,
  EditMultipleButton,
  GenericDataGrid,
  DeleteManyWithDialog,
  CustomFilterChooser,
  ExcelButton,
} from "@components";
import {
  REFETCHING_INTERVAL,
  eventFields,
  MODULES_ROUTES,
  SCREEN_ROUTES,
  ROWS_PER_TABLE_PAGE,
} from "@constants";
import {
  customFilterQuery,
  getEditableFields,
  returnParsedItemFromLocalStorage,
} from "@services";
import { selectedEventsState } from "@states";
import { eventTableColumns, invisibleColumns } from "./eventColumns";
import "@styles/main-page.css";

const API_ROUTE = MODULES_ROUTES.events;

function Events() {
  const [pageOption, setPageOption] = useState({
    page: 0,
    rowsPerPage: ROWS_PER_TABLE_PAGE,
  });
  const [eventsFilters, setEventsFilters] = useState(
    returnParsedItemFromLocalStorage(`${API_ROUTE}Grid`)?.filterModel
  );
  const [order, setOrder] = useState([]);

  const [eventList, setEventList] = useRecoilState(selectedEventsState);
  const apiRef = useGridApiRef();

  const { data, isLoading, refetch } = useQuery(
    [API_ROUTE, customFilterQuery(eventsFilters, pageOption, order)],
    {
      refetchInterval: REFETCHING_INTERVAL,
      select: ([result, total]) => {
        const parsedData = result.map((event) => ({
          ...event,
          simulatorId: Number(event.simulatorId),
          eventTakesPlaceAt:
            event.eventTakesPlaceAt && new Date(event.eventTakesPlaceAt),
          eventEndsAt: event.eventEndsAt && new Date(event.eventEndsAt),
          sendTimeScheduledAt:
            event.sendTimeScheduledAt && new Date(event.sendTimeScheduledAt),
          createdAt: event.createdAt && new Date(event.createdAt),
          type: event.type?.Name,
          status: event.status?.Name,
          damageLevel: event.damageLevel?.Name,
          generator: event.generator?.Name,
          lifeSavingPotential: event.lifeSavingPotential?.Name,
          reportingSource: event.reportingSource?.Name,
          treatmentStatus: event.treatmentStatus?.Name,
          structureType: event.structureType?.Name,
          isAcceptedByShual: !!event.acceptedByDestinationAt,
        }));

        return {
          result: parsedData,
          total,
        };
      },
    }
  );

  if (!data && !isLoading) return null;
  return (
    <div className={"page"}>
      <div className={"header"}>
        <span className={"headline"}>אירועים</span>
        <div className={"buttonsBar"}>
          <CustomFilterChooser apiRef={apiRef} />
          {eventList.length > 0 && (
            <>
              <DeleteManyWithDialog
                path={API_ROUTE}
                onSuccess={refetch}
                identifierList={eventList}
              />
              <EditMultipleButton
                path={API_ROUTE}
                onSuccess={refetch}
                identifierList={eventList}
                schema={getEditableFields(eventFields)}
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
        setFilter={setEventsFilters}
        apiRef={apiRef}
        rows={data?.result ?? []}
        columns={eventTableColumns(API_ROUTE, refetch)}
        selectionModel={eventList}
        onSelectionModelChange={(ids) => setEventList(ids)}
        dataKey={API_ROUTE}
        identifierKey={"simulatorId"}
        invisibleColumns={invisibleColumns}
        defaultSort={[
          { field: eventFields.sendTimeScheduledAt.key, sort: "asc" },
        ]}
      />
    </div>
  );
}

export default Events;
