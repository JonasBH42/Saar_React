import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import moment from "moment";
import { DataGridPro, heIL, GridToolbar } from "@mui/x-data-grid-pro";
import { Box } from "@mui/material";
import { csvOptions, ROWS_PER_TABLE_PAGE } from "@constants";
import { filterByPolygon, returnParsedItemFromLocalStorage } from "@services";
import { polygonPositionsState } from "@states";
import { queryClient } from "src";
import "@styles/mui-datagrid.css";

const getRowClassColor = ({ row }) => {
  if (row.acceptedByDestinationAt) return `dg-row--accepted`;
  if (row.isDisabled) return `dg-row--disabled`;

  const DELAY_GAP_MINUTES = 2;
  const currentTime = moment(Date.now());
  const sendTimeScheduledAt = moment(row.sendTimeScheduledAt);
  const createdAt = moment(row.createdAt);

  if (
    currentTime.diff(sendTimeScheduledAt, "minutes") > DELAY_GAP_MINUTES &&
    currentTime.diff(createdAt, "minutes") > DELAY_GAP_MINUTES
  ) {
    return "dg-row--delayed";
  }

  return `dg-row--regular`;
};

const getTreeDataPath = (data, identifierKey) => {
  const simulatorIdCurrentEvolve = {};

  return data.map((obj) => {
    const identifier = obj[identifierKey];
    const path = [];

    if (simulatorIdCurrentEvolve[identifier] === undefined) {
      simulatorIdCurrentEvolve[identifier] = 0;
      path.push(identifier);
    } else {
      simulatorIdCurrentEvolve[identifier]++;
      path.push(
        identifier,
        `${identifier}.${simulatorIdCurrentEvolve[identifier]}`
      );
    }

    return { ...obj, path };
  });
};

function GenericDataGrid({
  setOrder,
  rowCount,
  page,
  setPage,
  setFilter,
  rows,
  dataKey,
  identifierKey,
  invisibleColumns,
  defaultSort,
  columns,
  apiRef,
  ...props
}) {
  const onFilterChange = (filter) => {
    queryClient.removeQueries(dataKey, { exact: false });
    setFilter(filter);
  };

  const onSortChange = (sort) => {
    queryClient.removeQueries(dataKey, { exact: false });
    setOrder(sort);
  };

  const onPageChange = (page) => {
    queryClient.removeQueries(dataKey, { exact: false });
    setPage(page);
  };

  const polygon = useRecoilValue(polygonPositionsState);
  const navigate = useNavigate();

  useEffect(() => () => setFilter);

  const [rowCountState, setRowCountState] = useState(rowCount ?? 0);

  useEffect(() => {
    setRowCountState((prev) => (rowCount !== undefined ? rowCount : prev));
  }, [rowCount, setRowCountState]);

  return (
    <Box
      sx={{
        height: "90%",
        "& .dg-row--accepted": {
          bgcolor: () => "#ECF0E0",
          "&:hover": {
            bgcolor: () => "#E5EAD5 !important",
          },
        },
        "& .dg-row--disabled": {
          bgcolor: () => "#D3D9DA",
          "&:hover": {
            bgcolor: () => "#cccccc !important",
          },
        },
        "& .dg-row--delayed": {
          bgcolor: () => "#ffb3b3",
          "&:hover": {
            bgcolor: () => "#ffcccc !important",
          },
        },
      }}
    >
      <DataGridPro
        disableColumnPinning
        pagination
        checkboxSelection
        disableColumnResize
        disableSelectionOnClick
        columnBuffer={columns.length}
        treeData
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: { csvOptions },
        }}
        localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
        onPageChange={onPageChange}
        pageSize={ROWS_PER_TABLE_PAGE}
        rowsPerPageOptions={[ROWS_PER_TABLE_PAGE]}
        getRowId={({ uid }) => uid}
        onRowDoubleClick={({ id }) => navigate(`${id}`)}
        getTreeDataPath={({ path }) => path}
        getRowClassName={getRowClassColor}
        rows={filterByPolygon(getTreeDataPath(rows, identifierKey), polygon)}
        initialState={
          {
            filter: returnParsedItemFromLocalStorage(`${dataKey}Grid`),
            columns: { columnVisibilityModel: invisibleColumns },
          } ?? {
            sorting: { sortModel: defaultSort },
            columns: { columnVisibilityModel: invisibleColumns },
          }
        }
        onStateChange={({ filter }) => {
          if (dataKey)
            localStorage.setItem(`${dataKey}Grid`, JSON.stringify(filter));
        }}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={onSortChange}
        onFilterModelChange={onFilterChange}
        rowCount={rowCountState}
        columns={columns}
        {...props}
        apiRef={apiRef}
      />
    </Box>
  );
}

export default GenericDataGrid;
