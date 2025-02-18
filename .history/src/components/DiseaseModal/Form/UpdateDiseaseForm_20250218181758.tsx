import React from 'react';
import { Form, Input } from 'antd';

const UpdateDiseaseForm: React.FC<{ form: any }> = ({ form }) => {
  const onFinish = (values: any) => {
    console.log('Received values:', values); // Handle form submission, e.g., send to backend
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="allergyName"
        label="Tên bệnh nền"
        rules={[{ required: true, message: 'Tên bệnh nền là bắt buộc' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Mô tả là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UpdateDiseaseForm;
