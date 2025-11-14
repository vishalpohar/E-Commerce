import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  product: null,
  products: [],
  loading: false,
  orders: [],
  totalOrders: null,
  totalPages: null,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Create product error:", error);
      toast.error(error.response.data.error || "Something went wrong");
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  fetchProductById: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/product/${productId}`)
      set({ product: response.data.product, loading: false})
    } catch (error) {
      set({ error: "Failed to fetch product", loading: false });
      toast.error(error.response.data.error || "Failed to fetch product");
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ loading: true, products: [] });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);

      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products", error);
    }
  },
  searchProducts: async (query) => {
    set({ loading: true, products: [] });
    try {
      const response = await axios.get(`/products/search/${query}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      set({ products: [], error: "Failed to search products", loading: false });
      console.log("Error fetching products", error);
    }
  },
  getMyOrders: async (page, limit = 5) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `/products/orders?page=${page}&limit=${limit}`
      );
      const { orders, totalOrders, totalPages } = response.data;

      set({ orders, totalOrders, totalPages, loading: false });
    } catch (error) {
      set({
        orders: [],
        error: "Failed to get ordered products",
        loading: false,
      });
      console.log("Error fetching products", error);
    }
  },
}));
