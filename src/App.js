import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import LoginForm from './features/auth/LoginForm';
import Profile from './features/user/Profile';
import RegisterForm from './features/auth/RegisterForm';
import Movie from './features/user/Movie';
import VideoPlayer from './features/user/VideoPlayer';
import AdminManagement from './features/admin/AdminManagement';
import EnhancedTable from './features/admin/MovieManagement';
import GenreEnhancedTable from './features/admin/GenreManagement';
import ProducerEnhancedTable from './features/admin/ProducerManagement';
import NewMovie from './features/admin/NewMovie';
import Doormat from './features/user/Doormat';
import OAuth2LoginRedirect from './features/auth/OAuth2LoginRedirect';
import ResetPasswordRequestForm from './features/auth/ResetPasswordRequestForm';
import ResetPasswordForm from './features/auth/ResetPasswordForm';
import NotFound from './components/NotFound';
import { CssBaseline } from '@mui/material';
import RequireAuth from './components/RequireAuth';
import { Role } from './constants';
import Unauthorized from './components/Unauthorized';
import PersistedLogin from './components/PersistedLogin';

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
          <Route element={<PersistedLogin />}>
            <Route element={<RequireAuth />}>
              <Route path='user' element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route element={<PersistedLogin />}>
          <Route element={<RequireAuth allowedRole={Role.ADMIN} />}>
            <Route path="admin" element={<Layout admin />} >
              <Route index element={<AdminManagement />} />
              <Route path="movie" element={<EnhancedTable />} />
              <Route path="edit-movie/:slug" element={<NewMovie />} />
              <Route path="create-movie" element={<NewMovie createNew />} />
              <Route path="genre" element={<GenreEnhancedTable />} />
              <Route path="character" element={<AdminManagement />} />
              <Route path="producer" element={<ProducerEnhancedTable />} />
            </Route>
          </Route>
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
