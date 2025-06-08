import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import CheckIn from './pages/CheckIn';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
              <Route path="checkin/:bookingId" element={<CheckIn />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
