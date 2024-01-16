// components/PrivateRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import { supabase } from '../components/supabase';
import SignIn from '../pages/SignInPage';
import AppBar from '../components/AppBar';

const PrivateRoute = ({ path, element }) => {
  const user = supabase.auth.user();

  return user ? (
    <Route path="/scio/home" element={<AppBar />} />
    ) : (
    <Route path="/scio/" element={<SignIn />} />
    );
};

export default PrivateRoute;
