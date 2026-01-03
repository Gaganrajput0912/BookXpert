import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { twMerge } from "tailwind-merge";

const StatsChart = ({ employees, className }) => {
  // Logic to calculate gender stats
  const genderData = [
    {
      name: "Male",
      value: employees.filter((e) => e.gender === "Male").length,
    },
    {
      name: "Female",
      value: employees.filter((e) => e.gender === "Female").length,
    },
    {
      name: "Other",
      value: employees.filter((e) => e.gender === "Other").length,
    },
  ].filter((d) => d.value > 0);

  // Logic to calculate status stats
  const statusData = [
    { name: "Active", value: employees.filter((e) => e.active).length },
    { name: "Inactive", value: employees.filter((e) => !e.active).length },
  ];

  const GENDER_COLORS = ["#3b82f6", "#ec4899", "#a855f7"];
  const STATUS_COLORS = ["#10b981", "#6b7280"];

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      {/* Gender Distribution Chart */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Gender Distribution
        </h3>
        <div className="h-64 w-full">
          {genderData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                      className="stroke-white stroke-2 outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#374151", fontWeight: 600 }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Employment Status Chart */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm card-hover hover:scale-[1.01]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Employment Status
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statusData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#374151", fontWeight: 600 }}
              />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
                animationBegin={400}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
