import { Button, Modal, Form } from 'antd';
import { useState } from 'react';
import { updateAllergy } from '@/app/data/allergy';
import UpdateAllergyForm from './Form/UpdateAllergyForm';

const UpdateAllergyModal: React.FC<{ allergyId: number }> = ({ allergyId }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);

        try {
          
          await updateAllergy(allergyId.toString(), values, 'your-token-here');  
          setOpen(false);  
          setConfirmLoading(false);
          form.resetFields();  
        } catch (error) {
          console.error('Error updating allergy:', error);
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
          <Button key="reset" onClick={() => form.resetFields()} style={{ marginRight: 10 }}>
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
        <UpdateAllergyForm form={form} />
      </Modal>
    </>
  );
};

export default UpdateAllergyModal;
