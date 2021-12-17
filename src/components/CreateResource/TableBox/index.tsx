/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import {
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useState } from "react";
import { pick } from "dot-object";
import { Add } from "@mui/icons-material";
import { useStyles } from "./style";
import AddModal from "../ModalBox/AddModal";
import { generateDefaultObjectFromFields } from "../../../utils";

const TableBox = ({
  tableData, fieldChanged, store, sectionName,
}: any) => {
  const classes = useStyles();
  const [localState, setLocalState] = useState({ isModalOpen: false, currentIndex: -1 });

  const existingRows = pick(tableData.store, store);

  const onModalSubmit = (row: any) => {
    const existingRows = pick(tableData.store, store);
    const newRows = localState.currentIndex >= 0 ? existingRows.map((item: any, i: number) => {
      if (i === localState.currentIndex) return row;
      return item;
    }) : [...existingRows, row];
    fieldChanged(tableData.store, newRows);
  };

  const handleModalOpen = (index: number) => {
    setLocalState({ currentIndex: index, isModalOpen: true });
  };

  const handleModalClose = () => {
    setLocalState((prev) => ({ ...prev, isModalOpen: false }));
  };

  const onRemoveRow = (index: number) => {
    const existingRows = pick(tableData.store, store);
    fieldChanged(tableData.store, existingRows.filter((row: any, i: number) => {
      if (i === index) return false;
      return true;
    }));
  };

  return (
    <Box component="div">
      {existingRows.length > 0 && (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {
                  tableData.visible.map((row: any, index: number) => {
                    const props: TableCellProps = index !== 0 ? { align: "left" } : {};
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    return (<TableCell {...props}>{row.label}</TableCell>);
                  })
                }
                <TableCell align="left"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {existingRows.length > 0 && (existingRows.map((item: any, index: number) => (
                <TableRow key={index}>
                  {
                    tableData.visible.map((row: any, index: number) => {
                      const props: TableCellProps = index !== 0 ? { align: "left" } : { component: "th", scope: "row" };
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      return (<TableCell {...props}>{pick(row.value, item)}</TableCell>);
                    })
                  }
                  <TableCell align="right">
                    <IconButton onClick={() => handleModalOpen(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onRemoveRow(index)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {localState.isModalOpen
        && (
          <AddModal defaultValues={localState.currentIndex >= 0 ? existingRows[localState.currentIndex] : generateDefaultObjectFromFields(tableData.fields, {})} onCancel={handleModalClose} tableData={tableData} onSubmit={onModalSubmit} />
        )}
      <Button variant="outlined" className={classes.buttonClass} onClick={() => handleModalOpen(-1)}>
        <Add />
        {`Add ${sectionName}`}
      </Button>
    </Box>
  );
};

export default TableBox;
