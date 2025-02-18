import React from 'react';
import { Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const AddDiseaseForm: React.FC<{ form: any }> = ({ form }) => {
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
      <Form.Item name="Tên bệnh nền" label="Tên dị ứng" rules={[{ required: true, message: 'Tên dị ứng là bắt buộc' }]}>
        <Input />
      </Form.Item>
      
      
      <Form.Item name="Ghi chú" label="Ghi chú" rules={[{ required: true, message: 'Ghi chú là bắt buộc' }]}>
      <Input />
      </Form.Item>
      
    </Form>
  );
};

export default AddDiseaseForm;
