import React from 'react';
import { Form, Input } from 'antd';

const UpdateAllergyForm: React.FC<{ form: any }> = ({ form }) => {
  const onFinish = (values: any) => {
    console.log('Received values:', values); 
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
        label="Tên dị ứng"
        rules={[{ required: true, message: 'Tên dị ứng là bắt buộc' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Ghi chú"
        rules={[{ required: true, message: 'Ghi chú là bắt buộc' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default UpdateAllergyForm;
