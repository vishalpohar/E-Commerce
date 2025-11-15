import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  IndianRupee,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(`/analytics?range=${timeRange}`);
        setAnalyticsData(response.data.analyticsData);
        const formattedData = response.data.dailySalesData.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));
        setDailySalesData(formattedData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label, showSales }) => {
    if (active && payload && payload.length) {
      const sales = payload.find((p) => p.dataKey === "sales")?.value || 0;
      const revenue = payload.find((p) => p.dataKey === "revenue")?.value || 0;

      return (
        <div
          className="bg-white p-3 border border-gray-200 rounded-xl shadow-md"
          style={{ minWidth: 140 }}>
          <p className="text-sm font-semibold text-gray-800 mb-1">
            {new Date(label).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })}
          </p>
          {showSales && (
            <p className="text-xs text-blue-600">
              Sales:{" "}
              <span className="font-semibold text-gray-900">{sales}</span>
            </p>
          )}
          <p className="text-xs text-green-600">
            Revenue:{" "}
            <span className="font-semibold text-gray-900">
              ₹{revenue.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Analytics Dashboard
            </h2>
            <p className="text-gray-600">Track your store performance</p>
          </div>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border text-gray-700 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          change="+12.5%"
          icon={Users}
          color="orange"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          change="+5.2%"
          icon={Package}
          color="purple"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          change="+18.3%"
          icon={ShoppingCart}
          color="purple"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
          change="+22.7%"
          icon={IndianRupee}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-500"
          >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales & Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                angle={-25}
                textAnchor="end"
                fontSize={10}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip showSales={true} />} />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: 20 }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
                // dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                name="Revenue (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-500"
          >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300} paddingBottom={10}>
            <BarChart
              data={dailySalesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                angle={-25}
                textAnchor="end"
                fontSize={10}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip showSales={false} />} />
              <Bar
                dataKey="revenue"
                fill="#7c3aed"
                radius={[4, 4, 0, 0]}
                name="Revenue (₹)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden transform transition-all duration-1000"
      >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} bg-opacity-10`}>
            <Icon className={`w-6 h-6 text-white-600`} />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600">
            <TrendingUp className="w-4 h-4" />
            {change}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
      <div
        className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-r ${colorClasses[color]} opacity-5 rounded-tl-full`}
      />
    </div>
  );
};
