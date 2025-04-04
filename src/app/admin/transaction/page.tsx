
"use client"
import { Transaction, useGetAllTransactions } from '@/app/data'
import AddAllergyModal from '@/components/AllergyModal/AddAllergyModal'
import DeleteAllergyModal from '@/components/AllergyModal/DeleteAllerfyModal'
import Loader from '@/components/common/Loader'

import AuthLayout from '@/components/Layouts/AuthLayout'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Button, Image, Input, Pagination, PaginationProps, Space, Table, TableColumnsType, TableProps } from 'antd'
import { format, parseISO } from 'date-fns'

import Link from 'next/link'

import React, { useMemo, useState } from 'react'


function formatDate(dateString?: string): string {
  if (!dateString) return ""; 
  try {
    return format(parseISO(dateString), "hh:mm dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }}



const TransactionPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const pageIndex = 1;
  const pageSize = 100;
    
  
     const { data, isLoading, isError, error, refetch } = useGetAllTransactions(
       pageIndex,
       pageSize,
       searchText
     );
    const onChange: TableProps<Transaction>["onChange"] = (
      pagination,
      filters,
      sorter,
      extra,
    ) => {
      console.log("params", pagination, filters, sorter, extra);
    };
   
const columns: TableColumnsType<Transaction> = [
  {
    title: "Id",
    dataIndex: "userId",
    sorter: (a,b) => a.userId - b.userId,
    render: (text) => text || "Chưa có dữ liệu",
  },


  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    render: (text) => text || "Chưa cập nhật",
  },

  
  {
    title: "Mua",
    dataIndex: "packageName",
    sorter: (a, b) => a.packageName.localeCompare(b.packageName),
    render: (text) => text || "Chưa có dữ liệu",
  },
  
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a,b) => a.price - b.price,
    render: (text) => text || "Chưa có dữ liệu",
  },

  {
    title: "Ngày mua",
    dataIndex: "paidAt",
    sorter: (a, b) => a.paidAt.localeCompare(b.paidAt),
    render: (text) => formatDate(text) || "Chưa có dữ liệu",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiryDate",
    sorter: (a, b) => a.expiryDate.localeCompare(b.expiryDate),
    render: (text) => formatDate(text) || "Chưa có dữ liệu",
  },
  

  
  
];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const filteredData = Array.isArray(data)
  ? data.filter((item) =>
      item.email.toLowerCase().includes(searchText.toLowerCase()),
    )
  : [];




  
  return (
    <DefaultLayout>
    <div className="">
      <div className="flex justify-between">
        <div className="mb-2">Tổng cộng: {data?.length}</div>
        <Input
          placeholder="Tìm kiếm dị ứng"
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: 20, width: 300 }}
        />
        <div className="mb-2 flex space-x-3">
          {/* <AddAllergyModal /> */}
        </div>
      </div>
      {isLoading ? (
          <Loader />
        ) : (
      <Table<Transaction>
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
      />)}
      
    </div>
  </DefaultLayout>
  );
};

export default TransactionPage;
