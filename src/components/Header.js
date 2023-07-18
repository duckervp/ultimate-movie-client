import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../features/user/userSlice';
import Link from './Link';
import { Badge, InputBase, alpha } from '@mui/material';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ admin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(useSelector(state => state.user.accessToken));
  const user = useSelector(state => state.user);
  const [searchValue, setSearchValue] = useState("");
  const [fetchCount, setFetchCount] = useState(0);

  React.useEffect(() => {
    if (isAuthenticated && !user?.id && fetchCount === 0) {
      dispatch(fetchUser());
      setFetchCount(1);
    }
  }, [dispatch, user, fetchCount, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  }

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  const handleSearchBoxKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/?name=${searchValue}`, { replace: true });
    }
  }

  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Container>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link to={"/"}
            children={<Typography variant="h6" noWrap> MOVIE </Typography>}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }} />

          {!admin &&
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                id='searchbox'
                name='searchbox'
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleSearchValueChange}
                onKeyDown={handleSearchBoxKeyDown}
              />
            </Search>}

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link to={"/"}
            children={<Typography variant="h6" noWrap> MOVIE </Typography>}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          <Box sx={{ display: { md: 'flex' } }}>
            {
              isAuthenticated ?
                <Button onClick={handleLogout} variant='outlined' color='inherit'>
                  <Typography textAlign="center" color={"white"}>Logout</Typography>
                </Button> :
                <Typography textAlign="center">
                  <Link to="/login" sx={{ textDecoration: "none", color: "white" }} >
                    <Button variant='outlined' color='inherit'>
                      Login
                    </Button>
                  </Link>
                </Typography>
            }
          </Box>

          <Box sx={{ flexGrow: 0, marginRight: 2, marginLeft: 1 }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Link to={"/user"} sx={{ textDecoration: "none", color: "black" }} >
              <Tooltip title="Open your profile">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={`${user?.name} avatar`} src={user?.avatarUrl} sx={{ width: "30px", height: "30px" }} />
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;