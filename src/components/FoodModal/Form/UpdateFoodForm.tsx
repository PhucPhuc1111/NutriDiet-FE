// import React from 'react';
// import { Form, Input, Select, Space } from 'antd';

// const { Option } = Select;

// const UpdateFoodForm: React.FC<{ form: any }> = ({ form }) => {
//   const onFinish = (values: any) => {
//     console.log('Received values:', values); // Xử lý khi form submit
//   };

//   return (
//    <Form form={form} name="control-hooks" onFinish={onFinish}>
        
//         <div className="flex space-x-2">
//              <div className="w-2/3">
//              <Form.Item
//                  name="foodName"
//                  label="Tên nguyên liệu"
//                  rules={[{ required: true, message: "Tên thực phẩm là bắt buộc" }]}
//                >
//                  <Input />
//                </Form.Item>
//                <div className="flex justify-between space-x-4">
//                <Form.Item
//            name="mealType"
//            label="Chọn bữa"
//            rules={[{ required: true, message: "bữa là bắt buộc" }]}
//            style={{ width: '50%' }}
//          >
//            <Select placeholder="Chọn bữa" allowClear>
//              <Option value="Main">Chính</Option>
//              <Option value="Dessert">Phụ</Option>
//            </Select>
//          </Form.Item>
//          <Form.Item
//            name="foodType"
//            label="Loại"
//            style={{ width: '50%' }}
//            rules={[{ required: true, message: "Loại là bắt buộc" }]}
//          >
//            <Select placeholder="Chọn loại" allowClear>
//              <Option value="Vegetable">Rau củ quả</Option>
//              <Option value="Fruit">Trái cây</Option>
//              <Option value="Broth">Món nước</Option>
//              <Option value="Noodle">Món mì</Option>
//              <Option value="Bread">Bánh mì</Option>
//              <Option value="Meat">Thịt</Option>
//            </Select>
//          </Form.Item>
   
         
//                </div>
        
//                <Form.Item
//            name="Khẩu phần"
//            label="Khẩu phần"
//            rules={[{ required: true, message: "Đơn vị là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//          <div className="flex justify-between space-x-4">
//          <Form.Item
//            name="Carlories "
//            label="Carlories (cal)"
//            rules={[{ required: true, message: "Carlories là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//          <Form.Item
//            name="Protein"
//            label="Protein (g)"
//            rules={[{ required: true, message: "Carlories là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//          <Form.Item
//            name="Carbs"
//            label="Chất đạm (g)"
//            rules={[{ required: true, message: "Carlories là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//          </div>
        
//          <div className="flex justify-between space-x-4">
   
//          <Form.Item
//            name="Fat"
//            label="Chất béo (g)"
//            rules={[{ required: true, message: "Carlories là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
   
//          <Form.Item
//            name="Glucid"
//            label="Chất đường bột (g)"
//            rules={[{ required: true, message: "Carlories là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//          <Form.Item
//            name="Fiber"
//            label="Chất xơ (g)"
//            rules={[{ required: true, message: "Carlories là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//    </div>
//              </div>
//              <div className="w-1/3">
//              <Form.Item
//            name="imgUrl"
//            label="Hình ảnh"
//            rules={[{ required: true, message: "Loại là bắt buộc" }]}
//          >
//            <Input />
//          </Form.Item>
//                </div>
   
//         </div>
        
         
   
      
//          <Form.Item
//            name="allergies"
//            label="Dị ứng cần tránh"
//            rules={[{ required: true, message: "Dị ứng là bắt buộc" }]}
//          >
//            <Select mode="multiple" placeholder="Chọn nguyên liệu" allowClear>
//              <Option value="Thịt bò">Dị ứng hải sản</Option>
//              <Option value="Xương bò">Dị ứng thịt bò</Option>
//              <Option value="Bánh phở">Dị ứng trứng</Option>
//            </Select>
//          </Form.Item>
//          <Form.Item
//            name="diesease"
//            label="Bệnh cần tránh"
//            rules={[{ required: true, message: "Bệnh là bắt buộc" }]}
//          >
//            <Select mode="multiple" placeholder="Chọn bệnh cần tránh" allowClear>
//              <Option value="Thịt bò">Bệnh tiểu đường</Option>
//              <Option value="Xương bò">Bệnh cao huyết áp</Option>
//              <Option value="Bánh phở">Bệnh tim</Option>
//            </Select>
//          </Form.Item>
   
//          <Form.Item
//            name="description"
//            label="Mô tả"
//            rules={[{ required: true, message: "Loại là bắt buộc" }]}
//          >
//            <Input.TextArea />
//          </Form.Item>
//          <Form.Item
//            name="other"
//            label="Khác"
//            rules={[{ required: true, message: "Loại là bắt buộc" }]}
//          >
//            <Input.TextArea />
//          </Form.Item>
//        </Form>
//   );
// };

// export default UpdateFoodForm;
