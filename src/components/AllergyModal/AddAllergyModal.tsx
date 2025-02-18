import { Button, Modal, Form } from 'antd';
import { useState } from 'react';

import { createAllergy } from "@/app/data/allergy";  
import { useQueryClient } from "@tanstack/react-query"; 
import AddAllergyForm from './Form/AddAllergyForm';

const AddAllergyModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  const queryClient = useQueryClient(); 
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Form Values:', values);
        setConfirmLoading(true);
        
        try {
          
          await createAllergy(values, 'your-token-here'); 
          
          
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
          queryClient.invalidateQueries({ queryKey: ["allergies"] }); 
        } catch (error) {
          console.error("Error adding allergy:", error);
          setConfirmLoading(false);
        }
      })
      .catch((errorInfo) => {
        console.log('Validate Failed:', errorInfo);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleReset = () => {
    form.resetFields(); 
  };

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
        Thêm dị ứng
      </Button>
      <Modal
        title="Thêm dị ứng"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={handleReset} style={{ marginRight: 10 }}>
            Reset
          </Button>,
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <AddAllergyForm form={form} />
      </Modal>
    </>
  );
};

export default AddAllergyModal;
