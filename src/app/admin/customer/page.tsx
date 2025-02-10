
"use client"
import AddAllergyModal from '@/components/AllergyModal/AddAllergyModal'
import DeleteAllergyModal from '@/components/AllergyModal/DeleteAllerfyModal'
import UpdateAllergyModal from '@/components/AllergyModal/UpdateAllergyModal'
import AuthLayout from '@/components/Layouts/AuthLayout'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Button, Input, Pagination, PaginationProps, Space, Table, TableColumnsType, TableProps } from 'antd'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { isError } from 'react-query'



interface DataType {
  UserID: number;

  FullName: string;
   Email: string;
  Phone:string;
  Age: number;
  Gender: string;
  Location: string;
  Avartar: string;
  Status: string;


}

const data: DataType[] = [
  {
    UserID: 1,
    FullName: "Nguyễn Văn A",
    Email: "nguyenvana@example.com",
    Phone: "0123456789",
    Age: 30,
    Gender: "Nam",
    Location: "Hà Nội",
    Avartar: "https://example.com/avatar1.jpg",
    Status: "Active"
  },
  {
    UserID: 2,
    FullName: "Trần Thị B",
    Email: "tranthib@example.com",
    Phone: "0987654321",
    Age: 25,
    Gender: "Nữ",
    Location: "TP. Hồ Chí Minh",
    Avartar: "https://example.com/avatar2.jpg",
    Status: "Inactive"
  },
  {
    UserID: 3,
    FullName: "Lê Minh C",
    Email: "leminhc@example.com",
    Phone: "0912345678",
    Age: 28,
    Gender: "Nam",
    Location: "Đà Nẵng",
    Avartar: "https://example.com/avatar3.jpg",
    Status: "Active"
  },
  {
    UserID: 4,
    FullName: "Phạm Thị D",
    Email: "phamthid@example.com",
    Phone: "0934567890",
    Age: 22,
    Gender: "Nữ",
    Location: "Cần Thơ",
    Avartar: "https://example.com/avatar4.jpg",
    Status: "Active"
  },
  {
    UserID: 5,
    FullName: "Võ Văn E",
    Email: "vovanE@example.com",
    Phone: "0961234567",
    Age: 35,
    Gender: "Nam",
    Location: "Hải Phòng",
    Avartar: "https://example.com/avatar5.jpg",
    Status: "Inactive"
  }
];
const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "UserID",
    sorter: (a, b) => a.UserID - b.UserID,
  },
  {
    title: "Hình ảnh ",
    dataIndex: "Avartar",

  },
  {
    title: "Tên khách hàng",
    dataIndex: "FullName",
    sorter: (a, b) => a.FullName.localeCompare(b.FullName),
  },
  {
    title: "Email",
    dataIndex: "Email",
    
    
  },
  {
    title: "Số điện thoại",
    dataIndex: "Phone",
    sorter: (a, b) => a.Phone.localeCompare(b.Phone),
  },
  {
    title: "Tuổi ",
    dataIndex: "Age",
    sorter: (a, b) => a.Age - b.Age,
  },
  {
    title: "Địa chỉ ",
    dataIndex: "Location",
   
  },
  
 
  {
    title: "Chi tiết",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
    <Link href={`/admin/customer/${record.UserID}`}>
       
        <Button style={{ backgroundColor: '#2f855a', color: 'white' }}>Chi tiết</Button> </Link>
      </Space>
    ),
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

const CustomerPage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);};


  const filteredData = data.filter((item) => {
    return item.FullName.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <DefaultLayout>
      <div className="">
        <div className="flex justify-between" >
        <div className="mb-2">
          Tổng cộng: {data.length}
        </div>
         <Input
          placeholder="Tìm kiếm khách hàng"
          value={searchText}
          onChange={handleSearch} 
          style={{ marginBottom: 20, width: 300 }}
        />

        <div className="flex space-x-3 mb-2">
       
          
        </div>
        </div>
       
        <Table<DataType> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default CustomerPage;
