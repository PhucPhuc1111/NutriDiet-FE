
"use client"
import AuthLayout from '@/components/Layouts/AuthLayout'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Pagination, PaginationProps } from 'antd'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { isError } from 'react-query'



const page = () => {
   
    
  return (
      <DefaultLayout>
                
<main className="">
      <div className="flex flex-row items-center justify-between">
        {/* <div>{accounts.data?.length.toLocaleString() || 0} khách hàng</div> */}
        <div>100 khách hàng</div>
        <div className="relative">
          <IoSearchOutline className="absolute top-4 left-2 w-6 h-6" />
          <input
            type="search"
            className="rounded-md w-[463px] h-[57px] placeholder:pl-0 pl-10"
            placeholder="Tìm kiếm"
            name="Search"
            // value={searchTerm}
            // onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="my-2">
        <table className="w-full border-2">
          <thead className="bg-green-800 text-white text-center border-2">
            <tr>
              <th className="border-2 border-green-800">#ID</th>
              <th className="border-2 border-green-800">Tên</th>
              <th className="border-2 border-green-800">Email</th>
              <th className="border-2 border-green-800">Ngày tạo</th>
              <th className="border-2 border-green-800">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-black text-center border-2">
           
                <tr >
                  <th className="border-2 border-green-800 py-3">
                    #1
                  </th>
                  <th className="border-2 border-green-800 py-3 space-x-4  ">
                    <div className="flex  justify-center items-center space-x-2">
                    <Image
                      src={"/images/logo/logo.png"}
                      alt="avatar"
                      width={32}
                      height={32}
                      className=" rounded-full object-cover"
                    />
                    
                      <span>Lee Nguyen Gia Bao</span>
                      </div>
                 
                  </th>
                  <td className="border-2 border-green-800">
                    bao@gmail.com
                  </td>
                  <td className="border-2 border-green-800">
                    {/* {format(new Date(customer.createAt), "HH:mm dd/MM/yyyy")} */}
                    05/12/2003
                  </td>
                  <td className="border-2 border-green-800">
                    {/* <Link href={`/admin/customer/${customer.accountId}`}> */}
                      <button className="border rounded-md w-24 h-8 bg-green-800 text-white hover:bg-white hover:text-green-800">
                        Chi tiết
                      </button>
                    {/* </Link> */}
                  </td>
                </tr>
                <tr >
                  <th className="border-2 border-green-800 py-3">
                    #1
                  </th>
                  <th className="border-2 border-green-800 py-3 space-x-4  ">
                    <div className="flex  justify-center items-center space-x-2">
                    <Image
                      src={"/images/logo/logo.png"}
                      alt="avatar"
                      width={32}
                      height={32}
                      className=" rounded-full object-cover"
                    />
                    
                      <span>Lee Nguyen Gia Bao</span>
                      </div>
                 
                  </th>
                  <td className="border-2 border-green-800">
                    bao@gmail.com
                  </td>
                  <td className="border-2 border-green-800">
                    {/* {format(new Date(customer.createAt), "HH:mm dd/MM/yyyy")} */}
                    05/12/2003
                  </td>
                  <td className="border-2 border-green-800">
                    {/* <Link href={`/admin/customer/${customer.accountId}`}> */}
                      <button className="border rounded-md w-24 h-8 bg-green-800 text-white hover:bg-white hover:text-green-800">
                        Chi tiết
                      </button>
                    {/* </Link> */}
                  </td>
                </tr>
            
         
          </tbody>
        </table>

        <Pagination
          className="mt-4"
          align="center"
          showSizeChanger
          // onChange={onChange}
          // onShowSizeChange={onShowSizeChange}
          // defaultCurrent={currentPage}
          total={500}
        />
      </div>
    </main>
               </DefaultLayout>
  )
}

<<<<<<< HEAD
const data: DataType[] = [
  {
    AllergyID: 1,
    AllergyName: "Dị ứng hải sản",
    Notes: "Tránh các loại hải sản như tôm, cua, mực, bạch tuộc, cá.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 2,
    AllergyName: "Dị ứng đậu phộng",
    Notes: "Tránh tất cả các sản phẩm có chứa đậu phộng hoặc các chế phẩm từ đậu phộng.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 3,
    AllergyName: "Dị ứng sữa",
    Notes: "Tránh các sản phẩm từ sữa như sữa tươi, phô mai, kem, và các thực phẩm chứa sữa.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 4,
    AllergyName: "Dị ứng trứng",
    Notes: "Tránh các thực phẩm có chứa trứng, bao gồm cả bánh, kem, và một số loại thực phẩm chế biến sẵn.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  },
  {
    AllergyID: 5,
    AllergyName: "Dị ứng lúa mì",
    Notes: "Tránh các thực phẩm chứa gluten, bao gồm bánh mì, mì, và các sản phẩm từ lúa mì.",
    CreatedAt: new Date().toISOString(),
    UpdatedAt: Date.now()
  }
];
const columns: TableColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "AllergyID",
    sorter: (a, b) => a.AllergyID - b.AllergyID,
  },
  {
    title: "Tên dị ứng",
    dataIndex: "AllergyName",
    sorter: (a, b) => a.AllergyName.localeCompare(b.AllergyName),
  },
  {
    title: "Chú ý",
    dataIndex: "Notes",
    
    
  },
  {
    title: "Ngày tạo",
    dataIndex: "CreatedAt",
    sorter: (a, b) => a.CreatedAt.localeCompare(b.CreatedAt),
  },
  {
    title: "UpdatedAt ",
    dataIndex: "UpdatedAt",
    sorter: (a, b) => a.UpdatedAt - b.UpdatedAt,
  },
 
  {
    title: "Sửa/Xóa",
    dataIndex: "action",
    render: (_: any, record: DataType) => (
      <Space size="middle">
        <UpdateAllergyModal/>
        <DeleteAllergyModal/>
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
    return item.AllergyName.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <DefaultLayout>
      <div className="">
        <div className="flex justify-between" >
        <div className="mb-2">
          Tổng cộng: {data.length}
        </div>
         <Input
          placeholder="Tìm kiếm thực phẩm"
          value={searchText}
          onChange={handleSearch} 
          style={{ marginBottom: 20, width: 300 }}
        />

        <div className="flex space-x-3 mb-2">
        <AddAllergyModal/>
          
        </div>
        </div>
       
        <Table<DataType> columns={columns} dataSource={filteredData} onChange={onChange} />
      </div>
    </DefaultLayout>
  );
};

export default CustomerPage;
=======
export default page
>>>>>>> 4792a396560cda92f9f080c1c8e0e53942e0b349
