import { Button, Modal, Form } from 'antd';
import { useState } from 'react';
import UpdateAllergyForm from './Form/UpdateAllergyForm'; // Ensure this import is correct

const UpdateAllergyModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm(); // Initialize form here

  const showModal = () => {
    setOpen(true); // Open the modal
  };

  const handleOk = () => {
    form
      .validateFields() // Validate form fields
      .then((values) => {
        console.log('Form Values:', values); // Process the values (e.g., send to server)
        setConfirmLoading(true); // Show loading while processing
        setTimeout(() => {
          setOpen(false); // Close the modal
          setConfirmLoading(false); // Hide loading
        }, 2000); 
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
        Sửa
      </Button>
      <Modal
        title="Sửa Allergy"
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
        <UpdateAllergyForm form={form} /> {/* Pass form to child component */}
      </Modal>
    </>
  );
};

export default UpdateAllergyModal;
