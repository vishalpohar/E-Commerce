import express from "express";
import { sellerRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, sellerRoute, async (req, res) => {
  try {
    const sellerId = req.user._id;
    const analyticsData = await getAnalyticsData(sellerId);
    const duration = parseInt(req.query.range.replace("d", ""));
    const timeRange = duration * 24 * 60 * 60 * 1000;

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - timeRange);

    const dailySalesData = await getDailySalesData(
      sellerId,
      startDate,
      endDate,
    );

    res.json({
      analyticsData,
      dailySalesData,
    });
  } catch (error) {
    console.log("Error in analytics route", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
