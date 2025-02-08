"use client"
import React from "react";
import { Table, Space } from "antd"; // Import Space từ antd
import type { TableColumnsType, TableProps } from "antd";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface DataType {
  id: number;
  foodName: string;
  foodType: string;
  calories: number;
  protein: string;
  cabs: string;
  fat: string;
  glucid: string;
  fiber: string;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Tên thực phẩm",
    dataIndex: "foodName",
    sorter: (a, b) => a.foodName.localeCompare(b.foodName),
  },
  {
    title: "Loại",
    dataIndex: "foodType",
    filters: [
      { text: "Rau", value: "Rau" },
      { text: "Thịt", value: "Thịt" },
      { text: "Trái cây", value: "Trái cây" },
      { text: "Khác", value: "Khác" },
    ],
    onFilter: (value, record) => record.foodType.startsWith(value as string),
    width: "30",
  },
  {
    title: "Calories (cal)",
    dataIndex: "calories",
    sorter: (a, b) => a.calories - b.calories,
  },
  {
    title: "Proteins (g)",
    dataIndex: "protein",
    sorter: (a, b) => a.protein.localeCompare(b.protein),
  },
  {
    title: "Chất đạm (g)",
    dataIndex: "cabs",
    sorter: (a, b) => a.cabs.localeCompare(b.cabs),
  },
  {
    title: "Chất béo (g)",
    dataIndex: "fat",
    sorter: (a, b) => a.fat.localeCompare(b.fat),
  },
  {
    title: "Chất bột đường (g)",
    dataIndex: "glucid",
    sorter: (a, b) => a.glucid.localeCompare(b.glucid),
  },
  {
    title: "Chất xơ (g)",
    dataIndex: "fiber",
    sorter: (a, b) => a.fiber.localeCompare(b.fiber),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <a>Sửa</a>
        <a>Xóa</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: 1,
    foodName: "Cháo",
    foodType: "Khác",
    calories: 32,
    protein: "0.65",
    cabs: "100",
    fat: "6.5",
    glucid: "2",
    fiber: "1",
    address: "New York No. 1 Lake Park",
  },
  {
    id: 2,
    foodName: "Phở",
    foodType: "Khác",
    calories: 42,
    protein: "0.64",
    cabs: "100",
    fat: "6.4",
    glucid: "2",
    fiber: "1",
    address: "London No. 1 Lake Park",
  },
  {
    id: 3,
    foodName: "Cơm trắng",
    foodType: "Khác",
    calories: 32,
    protein: "0.63",
    cabs: "100",
    fat: "2",
    glucid: "4",
    fiber: "2",
    address: "Sydney No. 1 Lake Park",
  },
  {
    id: 4,
    foodName: "Trứng",
    foodType: "Khác",
    calories: 32,
    protein: "0.62",
    cabs: "100",
    fat: "2",
    glucid: "1",
    fiber: "5",
    address: "London No. 2 Lake Park",
  },
  {
    id: 5,
    foodName: "Rau xà lách",
    foodType: "Rau",
    calories: 32,
    protein: "0.61",
    cabs: "100",
    fat: "3",
    glucid: "4",
    fiber: "6",
    address: "London No. 2 Lake Park",
  },
  {
    id: 6,
    foodName: "Thịt heo",
    foodType: "Thịt",
    calories: 32,
    protein: "0.60",
    cabs: "100",
    fat: "6.2",
    glucid: "5",
    fiber: "0.5",
    address: "London No. 2 Lake Park",
  },
  {
    id: 7,
    foodName: "Thịt bò",
    foodType: "Thịt",
    calories: 32,
    protein: "0.65",
    cabs: "100",
    fat: "2",
    glucid: "3",
    fiber: "1",
    address: "London No. 2 Lake Park",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const page: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="">
        <Table<DataType> columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default page;
