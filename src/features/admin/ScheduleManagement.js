import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { FormControl, InputLabel, NativeSelect, Pagination } from '@mui/material';
import EnhancedTableToolbar from '../../components/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/EnhancedTableHead';
import AlertDialog from '../../components/Dialog';
import { Action } from '../../constants';
import DeleteForm from './DeleteForm';
import BootstrapInput from '../../components/BootstrapInput';
import Breadcrumb from '../../components/Breadcumb';
import { toast } from 'react-toastify';
import { getComparator, handleError, showSuccessMessage, stableSort } from '../../utils';
import Loading from '../../components/Loading';
import { useAddScheduleMutation, useDeleteSchedulesMutation, useFetchAllSchedulesQuery, useUpdateScheduleMutation } from './slice/scheduleApiSlice';
import ScheduleForm from './ScheduleForm';

const HEAD_CELLS = [
  {
    id: 'No',
    numeric: false,
    disablePadding: true,
    label: 'No',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'cronExpression',
    numeric: false,
    disablePadding: false,
    label: 'Cron Expression',
  },
  {
    id: 'method',
    numeric: false,
    disablePadding: false,
    label: 'Method',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export default function ScheduleEnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('No');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [scheduleIds, setScheduleIds] = React.useState([]);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [dialogAction, setDialogAction] = React.useState("");
  const [formState, setFormState] = React.useState({});
  const [formOriginalState, setFormOriginalState] = React.useState({});
  const [saveAble, setSaveAble] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const getSelectedSchedules = React.useCallback(() => {
    return rows.filter(row => scheduleIds.includes(row.id));
  }, [scheduleIds, rows]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data: scheduleData, isError, error } = useFetchAllSchedulesQuery();
  const [addSchedule, { isLoading: isAdding }] = useAddScheduleMutation();
  const [updateSchedule, { isLoading: isUpdating }] = useUpdateScheduleMutation();
  const [deleteSchedules, { isLoading: isDeleting }] = useDeleteSchedulesMutation();

  React.useEffect(() => {
    setTotalElements(scheduleData?.totalElements);
    const rowDatas = scheduleData?.results.map((item, index) => ({ no: index + 1, ...item }));
    setRows(rowDatas || []);
  }, [scheduleData]);

  React.useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (scheduleIds.length === 1 && rows.length > 0) {
      const formState1 = getSelectedSchedules()[0];
      setFormState({ ...formState1 });
      setFormOriginalState({ ...formState1 });
    } else if (scheduleIds.length === 0) {
      setFormState({});
      setFormOriginalState({});
    }
  }, [rows, scheduleIds, getSelectedSchedules]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.no);
      setSelected(newSelected);
      const ids = rows.map((n) => n.id);
      setScheduleIds(ids);
      return;
    }
    setSelected([]);
    setScheduleIds([]);
  };

  const handleClick = (event, no, id) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];
    let ids = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
      ids = ids.concat(scheduleIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      ids = ids.concat(scheduleIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      ids = ids.concat(scheduleIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      ids = ids.concat(
        scheduleIds.slice(0, selectedIndex),
        scheduleIds.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setScheduleIds(ids);
  };

  const handlePageChange = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)),
    [rows, order, orderBy]
  );

  const handleEditDialogSave = async () => {
    if (setScheduleIds.length === 1) {
      try {
        const providerId = scheduleIds[0];
        const data = await updateSchedule({ id: providerId, payload: formState }).unwrap();
        const updatedRows = [...rows];
        let index = 0;
        for (let i = 0; i < updatedRows.length; i++) {
          if (updatedRows[i].id === providerId) {
            index = i;
          }
        }
        const updatedRow = { ...updatedRows[index], ...data?.result };
        updatedRows.splice(index, 1, updatedRow);
        setRows(updatedRows);
        setSelected([]);
        setScheduleIds([]);
        toast.success("Schedule updated successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error("Cannot update the schedule!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
    handleEditDialogClose();
  }

  const handleEditDialogClose = () => {
    setFormState({});
    setEditDialogOpen(false);
  }

  const toggleEditDialogOpen = () => {
    setDialogAction(Action.EDIT);
    setEditDialogOpen(!editDialogOpen);
  }

  const toggleDeleteDialogOpen = () => {
    setDialogAction(Action.DELETE);
    setDeleteDialogOpen(!deleteDialogOpen);
  }

  const toggleCreateDialogOpen = () => {
    setDialogAction(Action.CREATE);
    setCreateDialogOpen(!createDialogOpen);
  }

  const handleDeleteDialogProcess = async () => {
    if (scheduleIds.length > 0) {
      try {
        console.log(scheduleIds);
        await deleteSchedules(scheduleIds).unwrap();
        const providers = rows.filter(row => !scheduleIds.includes(row.id)).map((row, index) => ({ ...row, no: index + 1 }));
        setRows(providers);
        setSelected([]);
        setScheduleIds([]);
        const successMessage = scheduleIds.length > 1 ? "Schedules deleted successfully!" : "Schedule deleted successfully!";
        showSuccessMessage(successMessage);
      } catch (error) {
        toast.error(scheduleIds.length > 1 ? "Cannot delete the schedules!" : "Cannot delete the schedule!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }

    handleDeleteDialogClose();
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
    setFormState({});
  }

  const handleCreateDialogSave = async () => {
    try {
      const data = await addSchedule(formState).unwrap();
      const updatedRows = [...rows];
      updatedRows.push({ ...data?.result, no: rows.length + 1 });
      setRows(updatedRows);
      setSelected([]);
      setScheduleIds([]);

      handleCreateDialogClose();
      toast.success("Provider created successfully!", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error("Cannot create the provider!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  if (!rows) {
    return <Loading fullScreen />
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Breadcrumb
        links={
          [{ link: "/admin", title: "Dashboard" }]
        }
        currentPage="Schedule Management"
        admin
      />
      <AlertDialog
        open={deleteDialogOpen}
        dialogTitle="Delete Schedule"
        children={<DeleteForm names={getSelectedSchedules().map(item => item.name)} />}
        handleProcess={handleDeleteDialogProcess}
        handleClose={handleDeleteDialogClose}
        saveAble={saveAble}
        action={dialogAction}
        isLoading={isDeleting}
      />
      <AlertDialog
        open={createDialogOpen}
        dialogTitle="Create Schedule"
        children={
          <ScheduleForm
            action={dialogAction}
            originalState={formOriginalState}
            formState={formState}
            setFormState={setFormState}
            toggleSaveAble={setSaveAble}
          />
        }
        handleProcess={handleCreateDialogSave}
        handleClose={handleCreateDialogClose}
        saveAble={saveAble}
        action={dialogAction}
        isLoading={isAdding}
      />
      <AlertDialog
        open={editDialogOpen}
        dialogTitle="Edit Provider"
        children={
          <ScheduleForm
            action={dialogAction}
            originalState={formOriginalState}
            formState={formState}
            setFormState={setFormState}
            toggleSaveAble={setSaveAble}
          />}
        handleProcess={handleEditDialogSave}
        handleClose={handleEditDialogClose}
        saveAble={saveAble}
        action={dialogAction}
        isLoading={isUpdating}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          title="Provider"
          numSelected={selected.length}
          toggleCreateDialogOpen={toggleCreateDialogOpen}
          toggleEditDialogOpen={toggleEditDialogOpen}
          toggleDeleteDialogOpen={toggleDeleteDialogOpen}
          scrollPosition={scrollPosition}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={HEAD_CELLS}
              ariaLabel={"select all providers"}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.no);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.no, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.no}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        id={`checkbox-no-${row.no}`}
                        name={`checkbox-no-${row.no}`}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.no}
                    </TableCell>
                    {
                      HEAD_CELLS.map(cell => {
                        if (cell.id !== 'No') {
                          return (<TableCell key={Math.random()} align={cell.numeric ? 'right' : 'left'}> {row[cell.id]} </TableCell>);
                        }
                        return undefined;
                      })
                    }
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: 2, padding: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="demo-customized-select-native">Rows per page: </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={pageSize}
              onChange={handleChangeRowsPerPage}
              input={<BootstrapInput />}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
            </NativeSelect>
          </FormControl>
          {
            (totalElements > pageSize) && <Pagination
              count={Math.ceil(totalElements / pageSize)}
              shape="rounded"
              variant="outlined"
              page={pageNo}
              onChange={handlePageChange}
            />
          }
        </Box>
      </Paper>
      <FormControlLabel
        control={<Switch id='dense' name='dense' checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
