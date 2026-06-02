import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token });
      },
      register: async (name, email, password) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    { name: 'auth' }
  )
);

export default useAuthStore;
