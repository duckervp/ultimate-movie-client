import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Private from './components/Private';
import Layout from './components/Layout';
import LoginForm from './features/user/LoginForm';
import Profile from './features/user/Profile';
import RegisterForm from './features/user/RegisterForm';
import Movie from './features/movie/Movie';
import VideoPlayer from './features/movie/VideoPlayer';
import AdminManagement from './features/admin/AdminManagement';
import EnhancedTable from './features/admin/MovieManagement';
import GenreEnhancedTable from './features/admin/GenreManagement';
import ProducerEnhancedTable from './features/admin/ProducerManagement';
import NewMovie from './features/admin/NewMovie';
import Doormat from './features/movie/Doormat';
import OAuth2LoginRedirect from './features/user/OAuth2LoginRedirect';
import ResetPasswordRequestForm from './features/user/ResetPasswordRequestForm';
import ResetPasswordForm from './features/user/ResetPasswordForm';
import NotFound from './components/NotFound';
import { CssBaseline } from '@mui/material';
import RequireAuth from './components/RequireAuth';
import { Role } from './constants';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Doormat />} />
          <Route path=":slug">
            <Route index element={<Movie />} />
            <Route path="play" element={<VideoPlayer />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='user' element={<Profile />} />
          </Route>
        </Route>
        <Route path="admin" element={<Layout admin />}>
          <Route index element={<Private admin children={<AdminManagement />} />} />
          <Route path="movie" element={<Private admin children={<EnhancedTable />} />} />
          <Route path="edit-movie/:slug" element={<Private admin children={<NewMovie />} />} />
          <Route path="create-movie" element={<Private admin children={<NewMovie />} />} />
          <Route path="genre" element={<Private admin children={<GenreEnhancedTable />} />} />
          <Route path="character" element={<Private admin children={<AdminManagement />} />} />
          <Route path="producer" element={<Private admin children={<ProducerEnhancedTable />} />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/oauth2/redirect" element={<OAuth2LoginRedirect />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/reset-password-request" element={<ResetPasswordRequestForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
