import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addToWishlist, getWishlistProducts, removeWishlistProduct } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", protectRoute, getWishlistProducts);
router.post("/add/:id", protectRoute, addToWishlist);
router.delete("/:id", protectRoute, removeWishlistProduct);

export default router;