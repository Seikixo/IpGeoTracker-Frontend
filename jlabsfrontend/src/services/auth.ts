// src/services/auth.ts
import axiosInstance from './axios';

export const login = async (email: string, password: string) => {
  const res = await axiosInstance.post('/login', { email, password });
  return res.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post('/logout');
  } catch (error) {
    // Even if API call fails, we still want to clear local data
    console.warn('Logout API call failed, but clearing local data');
  }
};

export const fetchUser = async () => {
  const res = await axiosInstance.get('/user');
  return res.data;
};