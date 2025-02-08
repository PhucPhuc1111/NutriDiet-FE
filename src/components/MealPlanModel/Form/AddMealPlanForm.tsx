import React from 'react';
import { Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const AddMealPlanForm: React.FC<{ form: any }> = ({ form }) => {
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
      <Form.Item name="Tên kế hoạch" label="Tên kế hoạch" rules={[{ required: true, message: 'Tên kế hoạch là bắt buộc' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Mục tiêu" label="Mục tiêu" rules={[{ required: true, message: 'Mục tiêu là bắt buộc' }]}>
        <Select placeholder="Chọn đơn vị" allowClear>
          <Option value="Tăng cân" >Tăng cân</Option>
          <Option value="Giảm cân">Giảm cân</Option>
          <Option value="Giữ cân">Giữ cân</Option>
          <Option value="Tăng cơ - giảm mỡ">Tăng cơ - giảm mỡ</Option>
        </Select>
      </Form.Item>
      <Form.Item name="Thời gian" label="Thời gian" rules={[{ required: true, message: 'Thời gian là bắt buộc' }]}>
        <Input />
      </Form.Item>
      
      
      <Form.Item name="Status" label="Status" rules={[{ required: true, message: 'Ghi chú là bắt buộc' }]}>
      <Select placeholder="Chọn đơn vị" allowClear>
          <Option value="Active" >Active</Option>
          <Option value="Inactive">Inactive</Option>
          </Select>
      </Form.Item>
      
    </Form>
  );
};

export default AddMealPlanForm;
