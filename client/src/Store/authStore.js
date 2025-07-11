import { create } from "zustand";
import axios from "axios";
// import toast from "react-hot-toast";

//  Clean base URL setup
const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:2002/api/v1/user"
  : "/api/v1/user";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async ({ email, password, username, passwordConfirm }) => {
    if (!email || !username || !password || !passwordConfirm) {
      set({ error: "All fields are required", isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        username,
        password,
        passwordConfirm
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message || "Signup successful",
      });

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (otp) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/verifyaccount`, { otp });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: response.data.message || "Email verified successfully",
      });

      return response.data;

    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  resendOtp: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/resend-otp`);
      set({ isLoading: false, message: response.data.message || "OTP resent" });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to resend OTP",
        isLoading: false,
      });
      throw error;
    }
  },

  // ✅ NEW FUNCTION: checkAuth
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/:id`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        error: "Not authenticated",
      });
    }
  },
  
forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forget-password`, { email });

			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
  },


resetPassword: async ({ email, otp, newPassword }) => {
	set({ isLoading: true, error: null });

	try {
		const response = await axios.post(`${API_URL}/reset-password`, {
			email,
			otp,
			password: newPassword,
			passwordConfirm: newPassword, // needed for backend validation
		});

		set({ message: response.data.message, isLoading: false });
	} catch (error) {
		set({
			isLoading: false,
			error: error.response?.data?.message || "Error resetting password",
		});
		throw error;
	}
},

login: async (email, password) => {
  if (!email || !password) {
    set({ error: "Email and password are required", isLoading: false });
    return;
  }

  set({ isLoading: true, error: null });

  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    set({
      isAuthenticated: true,
      user: response.data.user,
      message: response.data.message || "Login successful",
      isLoading: false,
    });

  } catch (error) {
    set({
      error: error.response?.data?.message || "Error logging in",
      isLoading: false,
    });
    throw error;
  }
},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

  checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},

}));
