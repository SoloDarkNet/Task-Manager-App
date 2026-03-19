import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#11998e", "#f7971e", "#eb3349"];

const TaskPieChart = ({ task = [], onFilterChange }) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [showChart, setShowChart] = useState(false);

  if (!task || task.length === 0) return null;

  const completed = task.filter((t) => t.status === "Completed").length;
  const inProgress = task.filter((t) => t.status === "In Progress").length;
  const pending = task.filter((t) => t.status === "Pending").length;

  const data = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: inProgress },
    { name: "Pending", value: pending },
  ];

  const handleClick = (entry) => {
    const status = entry.name;
    if (activeStatus === status) {
      setActiveStatus(null);
      onFilterChange && onFilterChange(null);
    } else {
      setActiveStatus(status);
      onFilterChange && onFilterChange(status);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "16px",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setShowChart(!showChart)}
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
          borderRadius: "50px",
          padding: "8px 16px",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          margin: "20px 10px",
        }}
      >
        📊 {showChart ? "Hide Chart" : "Task Overview"}
      </button>

      {/* Chart Panel - button  */}
      {showChart && (
        <div
          style={{
            marginTop: "8px",
            width: "240px",
            background: "linear-gradient(135deg, #ffffff, #f0f4ff)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            border: "1px solid rgba(102, 126, 234, 0.2)",
          }}
        >
          {/* Title */}
          <p
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#1a237e",
              fontSize: "13px",
              marginBottom: "4px",
            }}
          >
            Task Overview
          </p>

          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    opacity={
                      activeStatus && activeStatus !== entry.name ? 0.3 : 1
                    }
                    stroke={activeStatus === entry.name ? "#333" : "none"}
                    strokeWidth={activeStatus === entry.name ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  fontSize: "11px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {data.map((entry, index) => (
              <div
                key={index}
                onClick={() => handleClick(entry)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "5px 8px",
                  borderRadius: "8px",
                  background:
                    activeStatus === entry.name
                      ? `${COLORS[index]}22`
                      : "transparent",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: COLORS[index],
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "12px", color: "#444" }}>
                  {entry.name}: <b>{entry.value}</b>
                </span>
              </div>
            ))}
          </div>

          {/* Clear Filter */}
          {activeStatus && (
            <button
              onClick={() => {
                setActiveStatus(null);
                onFilterChange && onFilterChange(null);
              }}
              style={{
                marginTop: "10px",
                width: "100%",
                fontSize: "12px",
                padding: "6px",
                border: "none",
                borderRadius: "8px",
                background: "#ede9fe",
                cursor: "pointer",
                color: "#5b21b6",
                fontWeight: "600",
              }}
            >
              Clear Filter ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPieChart;
