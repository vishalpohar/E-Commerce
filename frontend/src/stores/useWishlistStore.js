import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,
  hasFetched: false,
  addToWishlist: async (product) => {
    try {
      await axios.post(`/wishlist/add/${product._id}`);
      set((state) => ({
        wishlist: [...state.wishlist, product],
      }));
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  getWishlist: async () => {
    const { wishlist, hasFetched } = get();

    if (hasFetched && wishlist.length > 0) return;

    set({ loading: true });
    try {
      const response = await axios.get("/wishlist");
      set({ wishlist: response.data, loading: false, hasFetched: true });
    } catch (error) {
      set({ wishlist: [], loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  removeFromWishlist: async (productId) => {
    try {
      await axios.delete(`/wishlist/${productId}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item._id !== productId),
      }));
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  isInWishlist: (productId) => {
    const { wishlist } = get();
    return wishlist.some((item) => item._id === productId);
  },
}));
