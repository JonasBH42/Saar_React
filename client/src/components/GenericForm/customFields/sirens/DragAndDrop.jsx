import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Chip, styled, Typography } from "@mui/material";
import { formPolygonState } from "@states";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Controller } from "react-hook-form";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  display: "block",
  float: "right",
}));

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DragAndDrop({ setFieldValue, obj, control, isFormDisabled }) {
  const { data } = useRecoilValue(formPolygonState);
  const [columns, setColumns] = useState({
    affectedSirens: {
      name: "צופרים מושפעים",
      items: data.sirens,
    },
    unAffectedSirens: {
      name: "צופרים לא מושפעים",
      items: [],
    },
  });

  useEffect(() => {
    setColumns((prev) => {
      return {
        unAffectedSirens: { ...prev.unAffectedSirens, items: [] },
        affectedSirens: { ...prev.affectedSirens, items: data.sirens },
      };
    });
  }, [data.sirens]);

  useEffect(() => {
    setFieldValue(obj.key, columns.affectedSirens.items, { shouldDirty: true });
  }, [columns, setFieldValue, obj.key]);

  return (
    <Controller
      rules={obj.validation}
      name={obj.key}
      control={control}
      render={({ field }) => (
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columns, setColumns, field.onChange)
            }
          >
            {Object.entries(columns).map(([columnId, column]) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <Typography variant="h5" component="div">
                    {column.name}
                  </Typography>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "#EAF7F6"
                                : "white",
                              padding: 10,
                              width: 350,
                              height: 350,
                              borderRadius: 12,
                              border: "1px solid #DDDDDD",
                              overflowY: "auto",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.mdlc}
                                  draggableId={`${item.mdlc}`}
                                  index={index}
                                  isDragDisabled={isFormDisabled}
                                >
                                  {(provided) => (
                                    <ListItem
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div>
                                        <Chip
                                          sx={{
                                            bgcolor: "#60c7d6",
                                            color: "white",
                                            fontSize: 16,
                                            fontWeight: "bold",
                                          }}
                                          label={item.name}
                                        />
                                      </div>
                                    </ListItem>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      )}
    />
  );
}

export default DragAndDrop;
