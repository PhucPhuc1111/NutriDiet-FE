import React from 'react';
import { Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const UpdateFoodForm: React.FC<{ form: any }> = ({ form }) => {
  const onFinish = (values: any) => {
    console.log('Received values:', values); // Xử lý khi form submit
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="Tên thực phẩm" label="Tên nguyên liệu" rules={[{ required: true, message: 'Tên thực phẩm là bắt buộc' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Loại" label="Loại" rules={[{ required: true, message: 'Loại là bắt buộc' }]}>
        <Select placeholder="Chọn loại" allowClear>
          <Option value="Chay">Chay</Option>
          <Option value="Mặn">Mặn</Option>
          
        </Select>
      </Form.Item>
      <Form.Item name="Hình ảnh" label="Hình ảnh" rules={[{ required: true, message: 'Loại là bắt buộc' }]}>
      <Input />
      </Form.Item>
      <Form.Item name="Mô tả" label="Mô tả" rules={[{ required: true, message: 'Loại là bắt buộc' }]}>
      <Input />
      </Form.Item>
      <Form.Item name="Khẩu phần" label="Khẩu phần" rules={[{ required: true, message: 'Đơn vị là bắt buộc' }]}>
      {/* <Space>
<Input />
        <Select placeholder="Chọn đơn vị" allowClear>
          <Option value="gram">gram</Option>
          <Option value="chén">chén</Option>
          <Option value="quả">quả</Option>
          <Option value="củ">củ</Option>
        </Select>
      </Space> */}
      <Input />
      </Form.Item>
      <Space>

      
      <Form.Item name="Carlories " label="Carlories (cal)" rules={[{ required: true, message: 'Carlories là bắt buộc' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Protein" label="Protein (g)" rules={[{ required: true, message: 'Carlories là bắt buộc' }]}>
        <Input />
      </Form.Item></Space><Space>
      <Form.Item name="Carbs" label="Chất đạm (g)" rules={[{ required: true, message: 'Carlories là bắt buộc' }]}>
        <Input />
      </Form.Item>
      
      
      <Form.Item name="Fat" label="Chất béo (g)" rules={[{ required: true, message: 'Carlories là bắt buộc' }]}>
        <Input />
      </Form.Item> </Space>
      <Space>
      <Form.Item name="Glucid" label="Chất đường bột (g)" rules={[{ required: true, message: 'Carlories là bắt buộc' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Fiber" label="Chất xơ (g)" rules={[{ required: true, message: 'Carlories là bắt buộc' }]}>
        <Input />
      </Form.Item>
     </Space>
    </Form>
  );
};

export default UpdateFoodForm;
