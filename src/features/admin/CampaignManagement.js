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
import DeleteForm from './DeleteForm';
import { Action } from '../../constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BootstrapInput from '../../components/BootstrapInput';
import Breadcrumb from '../../components/Breadcumb';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { useFetchAllMoviesQuery } from "../user/slice/movieApiNoCredSlice";
import { useDeleteMoviesMutation } from "./slice/movieApiSlice";
import { getComparator, stableSort } from '../../utils';
import { useFetchAllCampaignsQuery } from './slice/campaignApiSlice';

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
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'providerName',
    numeric: false,
    disablePadding: false,
    label: 'Provider Name',
  },
];



export default function CampaignManagement() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('No');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalElements, setTotalElements] = React.useState(0);
  const [movies, setMovies] = React.useState([]);
  const [movieIds, setMovieIds] = React.useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const pageNo = searchParams.get("page") || 1;

  const {
    data: movieData,
  } = useFetchAllCampaignsQuery();

  const [deleteMovies, {isLoading: isDeleting}] = useDeleteMoviesMutation();

  React.useEffect(() => {
    setTotalElements(movieData?.totalElements);
    const rowDatas = movieData?.results?.map((el, index) => ({ no: index + 1, ...el }));
    setMovies(rowDatas);
  }, [movieData]);

  const getSelectedMovies = React.useCallback(() => {
    return movies.filter(movie => movieIds.includes(movie.id));
  }, [movieIds, movies]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = movies.map((n) => n.no);
      setSelected(newSelected);
      const ids = movies.map((n) => n.id);
      setMovieIds(ids);
      return;
    }
    setSelected([]);
    setMovieIds([]);
  };

  const handleClick = (event, no, id) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];
    let ids = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
      ids = ids.concat(movieIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      ids = ids.concat(movieIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      ids = ids.concat(movieIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      ids = ids.concat(
        movieIds.slice(0, selectedIndex),
        movieIds.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setMovieIds(ids);
  };

  const handlePageChange = (event, newPage) => {
    searchParams.set("page", newPage);
    navigate("/admin/movie?".concat(searchParams.toString()), { replace: true });
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
      stableSort(movies, getComparator(order, orderBy)),
    [movies, order, orderBy]
  );

  const toggleDeleteDialogOpen = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  }

  const toggleEditDialogOpen = () => {
    const selectedItem = getSelectedMovies();
    if (selectedItem.length > 0) {
      navigate(`/admin/edit-movie/${selectedItem[0].slug}`, { replace: true });
    }

  }

  const toggleCreateDialogOpen = () => {
    navigate("/admin/create-movie", { replace: true });
  }

  const handleDeleteDialogProcess = async () => {
    if (movieIds.length > 0) {
      try {
        await deleteMovies(movieIds).unwrap();
        const rows = movies.filter(movie => !movieIds.includes(movie.id)).map((movie, index) => ({ ...movie, no: index + 1 }));
        setMovies(rows);
        setSelected([]);
        setMovieIds([]);
        toast.success(movieIds.length > 1 ? "Movies deleted successfully!" : "Movie deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error(movieIds.length > 1 ? "Cannot delete the movies!" : "Cannot delete the movie!", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }

    handleDeleteDialogClose();
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  }

  if (!searchParams.get("page")) {
    searchParams.append("page", 1);
    return <Loading />;
  }

  if (!movies) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Breadcrumb
        links={
          [{ link: "/admin", title: "Dashboard" }]
        }
        currentPage="Campaign"
        admin
      />
      <AlertDialog
        open={deleteDialogOpen}
        dialogTitle="Delete Movie"
        children={<DeleteForm names={getSelectedMovies().map(movie => movie.name)} />}
        handleProcess={handleDeleteDialogProcess}
        handleClose={handleDeleteDialogClose}
        saveAble={false}
        action={Action.DELETE}
        isLoading={isDeleting}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          title="Campaigns"
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
              rowCount={movies.length}
              headCells={headCells}
              ariaLabel={"select all movies"}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
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
                    <TableCell align="left">{row?.name}</TableCell>
                    <TableCell align="left">{row?.status}</TableCell>
                    <TableCell align="right">{row?.type}</TableCell>
                    <TableCell align="right">{row?.provider?.name ? row?.provider?.name : "N/A"}</TableCell>
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
              page={Number.parseInt(searchParams.get("page") || 1)}
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