import { create } from 'zustand';
import axios from 'axios';

interface UserProfileState {
  fullName: string;
  profilePicture: string;
  email: string;
  bio: string;
  id: string;
  isAuthenticated: boolean;
  token: string | null;
  checkAuthentication: () => void;
  updateProfile: (profileData: Partial<UserProfileState>) => void;
  resetProfile: () => void;
  setAuthenticated: (authenticated: boolean) => void;
}

const useStore = create<UserProfileState>((set) => ({
  fullName: '',
  profilePicture: '',
  email: '',
  bio: '',
  id: '',
  isAuthenticated: false,
  token: null,

  // Verificar el token en el localStorage
  checkAuthentication: () => {
    const token = localStorage.getItem('token');
    const urlBase = import.meta.env.VITE_BASE_URL;

    if (token) {
      axios
        .get(`${urlBase}api/auth/check-status`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200 && response.data?.token) {
            set({
              isAuthenticated: true,
              token: response.data.token,
              fullName: response.data.fullName,
              profilePicture: response.data.profilePicture,
              email: response.data.email,
              id: response.data.id,
            });
          } else {
            set({ isAuthenticated: false, token: null });
          }
        })
        .catch(() => {
          set({ isAuthenticated: false, token: null });
        });
    } else {
      set({ isAuthenticated: false, token: null });
    }
  },

  updateProfile: (profileData) =>
    set((state) => ({
      ...state,
      ...profileData,
    })),

  resetProfile: () =>
    set({
      fullName: '',
      profilePicture: '',
      email: '',
      bio: '',
      id: '',
      isAuthenticated: false,
      token: null,
    }),

  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
}));

export default useStore;
