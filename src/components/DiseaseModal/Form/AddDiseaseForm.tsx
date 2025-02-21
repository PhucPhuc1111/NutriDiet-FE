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
      <Form.Item name="diseaseName" label="Tên bệnh nền" rules={[{ required: true, message: 'Tên dị ứng là bắt buộc' }]}>
        <Input />
      </Form.Item>
      
      
      <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Mô tả là bắt buộc' }]}>
      <Input />
      </Form.Item>
      
    </Form>
  );
};

export default AddDiseaseForm;
