import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { Option } from "antd/es/mentions";

const AddMealDaily = () => {
  const [open, setOpen] = useState<string | null>(null); // Trạng thái dropdown cho ngày
  const [days, setDays] = useState<
    { dayNumber: string; foodDetails: string[] }[]
  >([{ dayNumber: "Ngày 1", foodDetails: [] }]);

  const onFinish = (values: any) => {
    console.log("Received values:", values); // Xử lý khi form submit
  };

  // Hàm xử lý thêm ngày mới
  const addDay = () => {
    setDays([
      ...days,
      { dayNumber: `Ngày ${days.length + 1}`, foodDetails: [] },
    ]);
  };

  // Hàm xử lý xóa ngày
  const deleteDay = (dayNumber: string) => {
    const updatedDays = days.filter((day) => day.dayNumber !== dayNumber);
    setDays(updatedDays);
  };

  // Hàm xử lý chọn ngày
  const toggleDropdown = (dayNumber: string) => {
    if (open === dayNumber) {
      setOpen(null); // Đóng nếu đang mở
    } else {
      setOpen(dayNumber); // Mở dropdown cho ngày đã chọn
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Danh sách các ngày</div>
        <Button className="bg-green-800 text-white" onClick={addDay}>
          Thêm ngày
        </Button>
      </div>
      {days.map((day, index) => (
      <div  key={index} className="pt-10">
        
     
        <div className="flex w-full justify-between rounded-t-xl bg-green-800 p-3 font-semibold text-white"
         onClick={() => toggleDropdown(day.dayNumber)}>
        <div>{day.dayNumber}</div>
        <div className="flex space-x-3">

   
        <DownOutlined
                className={`${open === day.dayNumber ? 'rotate-180' : ''}`}
              />
             <Button
              className="bg-white text-green-800"
             
            >
              Sửa
            </Button>      
             <Button
              className="bg-red-600 text-white"
              onClick={() => deleteDay(day.dayNumber)}
            >
              Xóa
            </Button>      
             </div>
        </div>
        
       
          
        {/* Dropdown content */}
        {open === day.dayNumber && (
          <div className="border-2 border-green-800 p-10">
            <div className="flex">
              <div className="w-3/4 border-r-2 border-green-800">
                <div className="">{day.dayNumber}</div>
                <Form
                  name="control-hooks"
                  className="text-white"
                  onFinish={onFinish}
                  style={{ maxWidth: 600 }}
                >
                  <Form.Item
                    name="Bữa sáng"
                    label="Bữa sáng (350 cal)"
                    rules={[
                      { required: true, message: "Bữa sáng là bắt buộc" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn bữa sáng"
                      allowClear
                      mode="multiple"
                    >
                      <Option value="Phở bò">Phở bò</Option>
                      <Option value="Phở gà (200cal)">Phở gà</Option>
                      <Option value="Cơm sườn (200cal)">Cơm sườn</Option>
                      <Option value="Bún bò huế (200cal)">Bún bò huế</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="Bữa trưa"
                    label="Bữa trưa"
                    rules={[
                      { required: true, message: "Bữa trưa là bắt buộc" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn bữa trưa"
                      allowClear
                      mode="multiple"
                    >
                      <Option value="Phở bò">Phở bò</Option>
                      <Option value="Phở gà">Phở gà</Option>
                      <Option value="Cơm sườn">Cơm sườn</Option>
                      <Option value="Bún bò huế">Bún bò huế</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="Bữa chiều"
                    label="Bữa chiều"
                    rules={[
                      { required: true, message: "Bữa chiều là bắt buộc" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn bữa chiều"
                      allowClear
                      mode="multiple"
                    >
                      <Option value="Phở bò">Phở bò</Option>
                      <Option value="Phở gà">Phở gà</Option>
                      <Option value="Cơm sườn">Cơm sườn</Option>
                      <Option value="Bún bò huế">Bún bò huế</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="Bữa tối"
                    label="Bữa tối"
                    rules={[{ required: true, message: "Bữa tối là bắt buộc" }]}
                  >
                    <Select
                      placeholder="Chọn bữa tối"
                      allowClear
                      mode="multiple"
                    >
                      <Option value="Phở bò">Phở bò</Option>
                      <Option value="Phở gà">Phở gà</Option>
                      <Option value="Cơm sườn">Cơm sườn</Option>
                      <Option value="Bún bò huế">Bún bò huế</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </div>
              <div className="w-1/4 space-y-3">
                <div className="space-y-4 p-5">
                  <div className=" flex justify-center bg-green-800 text-lg font-semibold text-white ">
                    Tổng calo ngày 1
                  </div>
                  <div className="flex justify-center space-x-4 border-b-2 border-green-800">
                    <div className="space-y-3">
                      <p>Bữa sáng:</p>
                      <p>Bữa trưa:</p>
                      <p>Bữa chiều:</p>
                      <p>Bữa tối:</p>
                    </div>
                    <div className="space-y-3 pb-2 ">
                      <p>350 cal</p>
                      <p>350 cal</p>
                      <p>350 cal</p>
                      <p>350 cal</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="p-2">Tổng cộng:</div>
                    <div className="rounded-lg bg-green-800 p-2 font-semibold text-white ">
                      1400 cal
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div>
                 <div className="flex justify-center space-x-4 p-10">
                            <Button className="p-3 w-20 h-10">Hủy</Button>
                            <Button className="p-3 w-20 h-10" style={{ backgroundColor: '#296547', color: 'white' }}>Thêm </Button>
                
                          </div>
            </div>
          </div>
        )}
      </div>
      ))}
    </div>
  );
};

export default AddMealDaily;
