import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  userLoggedIn: false,
  loading: true,
  gotUser: false,
  check: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ userLoggedIn: res.data.userLoggedIn, loading: false });
    } catch (error) {
      console.log("error in checkUserLoggedIn", error);
      set({ userLoggedIn: false, loading: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ userLoggedIn: false });
    } catch (error) {
      console.log("error in handleLogout", error);
      set({ userLoggedIn: false });
    }
  },
  login: async (formData) => {
    // handling Login from backend
    try {
      const res = await axiosInstance.post("/auth/Login", formData);

      if (res.data.isTokenGenerated === true) {
        set({ userLoggedIn: true });
        return true;
      }
      return false;
    } catch (error) {
      console.log("error in useAuthStore.Login:", error);
    }
  },
  getUser: async () => {
    try {
      const res = await axiosInstance.get("/auth/getuser");
      set({ gotUser: true });
      return res.data;

    } catch (err) {
      console.error(err);
    }
  }

}));
