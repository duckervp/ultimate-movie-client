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
import { useFetchAllGenresQuery } from '../user/slice/genreApiNoCredSlice';
import { getComparator, handleError, showSuccessMessage, stableSort } from '../../utils';
import Loading from '../../components/Loading';
import { useAddGenreMutation, useDeleteGenresMutation, useUpdateGenreMutation } from "./slice/genreApiSlice";
import SimpleForm from './SimpleForm';

const headCells = [
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
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'slug',
    numeric: false,
    disablePadding: false,
    label: 'Slug',
  },
];

export default function GenreEnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('no');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [genreIds, setGenreIds] = React.useState([]);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [dialogAction, setDialogAction] = React.useState("");
  const [editFormState, setEditFormState] = React.useState({ name: "", description: "" });
  const [editFormOriginalState, setEditFormOriginalState] = React.useState({ name: "", description: "" });
  const [saveAble, setSaveAble] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const getSelectedGenres = React.useCallback(() => {
    return (rows || []).filter(row => genreIds.includes(row.id));
  }, [genreIds, rows]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // mutation api
  const { data: genreData, isError, error } = useFetchAllGenresQuery();
  const [addGenre, { isLoading: isAdding }] = useAddGenreMutation();
  const [updateGenre, { isLoading: isUpdating }] = useUpdateGenreMutation();
  const [deleteGenres, { isLoading: isDeleting }] = useDeleteGenresMutation();

  React.useEffect(() => {
    setTotalElements(genreData?.totalElements);
    const rowDatas = genreData?.results?.slice().map((item, index) => ({ no: index + 1, ...item }));
    setRows(rowDatas);
  }, [genreData]);

  React.useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [isError, error]);

  React.useEffect(() => {
    if (genreIds.length === 1 && rows.length > 0) {
      const formState = getSelectedGenres()[0];
      setEditFormState({ name: formState.name, description: formState.description });
      setEditFormOriginalState({ name: formState.name, description: formState.description });
    } else if (genreIds.length === 0) {
      setEditFormState({ name: "", description: "" });
      setEditFormOriginalState({ name: "", description: "" });
    }
  }, [rows, genreIds, getSelectedGenres]);

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
      setGenreIds(ids);
      return;
    }
    setSelected([]);
    setGenreIds([]);
  };

  const handleClick = (event, no, id) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];
    let ids = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
      ids = ids.concat(genreIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      ids = ids.concat(genreIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      ids = ids.concat(genreIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      ids = ids.concat(
        genreIds.slice(0, selectedIndex),
        genreIds.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setGenreIds(ids);
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

  const handleEditDialogClose = () => {
    setEditFormState(editFormOriginalState);
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

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false);
  }

  const handleEditDialogSave = async () => {
    if (genreIds.length === 1) {
      try {
        const genreId = genreIds[0];
        const data = await updateGenre({ id: genreId, payload: editFormState }).unwrap();
        const updatedRows = [...rows];
        let index = 0;
        for (let i = 0; i < updatedRows.length; i++) {
          if (updatedRows[i].id === genreId) {
            index = i;
          }
        }
        const updatedRow = { ...updatedRows[index], ...data?.result };
        updatedRows.splice(index, 1, updatedRow);
        setRows(updatedRows);
        setSelected([]);
        setGenreIds([]);
        showSuccessMessage("Genre updated successfully!");
      } catch (error) {
        handleError(error, "Cannot update the genre!");
      }
    }
    handleEditDialogClose();
  }

  const handleDeleteDialogProcess = async () => {
    if (genreIds.length > 0) {
      try {
        await deleteGenres(genreIds).unwrap();
        const genres = rows.filter(row => !genreIds.includes(row.id)).map((row, index) => ({ ...row, no: index + 1 }));
        setRows(genres);
        setSelected([]);
        setGenreIds([]);
        const successMessage = genreIds.length > 1 ? "Genres deleted successfully!" : "Genres deleted successfully!";
        showSuccessMessage(successMessage);
      } catch (error) {
        const errorMessage = genreIds.length > 1 ? "Cannot delete the genres!" : "Cannot delete the genre!";
        handleError(error, errorMessage);
      }
    }

    handleDeleteDialogClose();
  }

  const handleCreateDialogSave = async () => {
    try {
      const data = await addGenre(editFormState).unwrap();
      const updatedRows = [...rows];
      updatedRows.push({ ...data?.result, no: rows.length + 1 });
      setRows(updatedRows);
      setSelected([]);
      setGenreIds([]);

      handleCreateDialogClose();
      toast.success("Genre created successfully!", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error("Cannot create the genre!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  if (!rows) {
    return <Loading />
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Breadcrumb
        links={
          [{ link: "/admin", title: "Dashboard" }]
        }
        currentPage="Genre"
        admin
      />
      <AlertDialog
        open={deleteDialogOpen}
        dialogTitle="Delete Genre"
        children={<DeleteForm names={getSelectedGenres().map(genre => genre.name)} />}
        handleProcess={handleDeleteDialogProcess}
        handleClose={handleDeleteDialogClose}
        saveAble={saveAble}
        action={dialogAction}
        isLoading={isDeleting}
      />
      <AlertDialog
        open={createDialogOpen}
        dialogTitle="Create new Genre"
        children={
          <SimpleForm
            action={dialogAction}
            originalState={editFormOriginalState}
            formState={editFormState}
            setFormState={setEditFormState}
            toggleSaveAble={setSaveAble} />}
        handleProcess={handleCreateDialogSave}
        handleClose={handleCreateDialogClose}
        saveAble={saveAble}
        action={dialogAction}
        isLoading={isAdding}
      />
      <AlertDialog
        open={editDialogOpen}
        dialogTitle="Edit a Genre"
        children={
          <SimpleForm
            action={dialogAction}
            originalState={editFormOriginalState}
            formState={editFormState}
            setFormState={setEditFormState}
            toggleSaveAble={setSaveAble} />}
        handleProcess={handleEditDialogSave}
        handleClose={handleEditDialogClose}
        saveAble={saveAble}
        action={dialogAction}
        isLoading={isUpdating}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          title="Genre"
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
              headCells={headCells}
              ariaLabel={"select all genres"}
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
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.slug}</TableCell>
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