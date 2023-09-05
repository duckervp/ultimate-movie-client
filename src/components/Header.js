import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Link from './Link';
import { Badge, InputBase, alpha } from '@mui/material';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import UserAvatar from './UserAvartar';
import { logout, selectCurrentUser } from '../features/auth/slice/authSlice';

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
  const user =  useSelector(selectCurrentUser);
  
  const [searchValue, setSearchValue] = useState("");


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
              user ?
                <Tooltip title="Logout">
                  <IconButton onClick={handleLogout} variant='outlined' color='inherit' sx={{backgroundColor: "gray", p: 0.7}}>
                    <LogoutIcon style={{fontSize: 20}}/>
                  </IconButton></Tooltip> :
                <Link to="/login" sx={{ textDecoration: "none", color: "white" }} >
                  <Tooltip title="Login">
                    <IconButton variant='outlined' color='inherit' sx={{backgroundColor: "gray", p: 0.7}}>
                      <LoginIcon style={{fontSize: 20}} />
                    </IconButton>
                  </Tooltip>
                </Link>
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

          <UserAvatar user={user} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;