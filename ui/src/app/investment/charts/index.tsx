"use client";

import Card from "@/components/std/Card";
import Row from "@/components/std/Row";
import style from "./charts.module.css";

import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

type props = {
  charts_data: {
    amount: number;
    status: string;
    id: number;
  }[];
};

export default function Charts(props: props) {
  const colors = [
    "var(--accent)",
    "#FA8072",
    "#AF69EE",
    "#3DED97",
    "#3AC7EB",
    "#F9A603",
  ];

  return (
    <Row gap={1} className={style.charts}>
      <Card>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={props.charts_data}>
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={props.charts_data}
                dataKey="amount"
                nameKey="id"
                cx="50%"
                cy="50%"
                fill="#8884d8"
                label
              >
                {props.charts_data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </Row>
  );
}
