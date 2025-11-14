import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();
    const duration = parseInt(req.query.range.replace("d", ""));
    const timeRange = duration * 24 * 60 * 60 * 1000;

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - timeRange);

    const dailySalesData = await getDailySalesData(startDate, endDate);

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
