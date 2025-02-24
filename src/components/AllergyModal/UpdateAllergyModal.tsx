import { Button, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { getAllergyById, updateAllergy, getAllAllergies, useGetAllAllergies } from '@/app/data/allergy';
import UpdateAllergyForm from './Form/UpdateAllergyForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateAllergyModal: React.FC<{ allergyId: number; refetch: () => void }> = ({ allergyId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentAllergy, setCurrentAllergy] = useState<any>(null);

  const showModal = () => {
    setOpen(true);
  };

  const { data: allAllergiesData } = useGetAllAllergies(1, 10,"");

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);

      try {
    
        const allAllergies = allAllergiesData || [];

       
        const isDuplicate =
        values.allergyName.toLowerCase() !== currentAllergy?.allergyName.toLowerCase() && // Kiểm tra nếu tên đã thay đổi
        allAllergies.some(
          (allergy: any) =>
            allergy.allergyName.toLowerCase() === values.allergyName.toLowerCase() &&
            allergy.id !== allergyId
        );

        if (isDuplicate) {
          form.setFields([
            {
              name: 'allergyName',
              errors: ['Tên dị ứng đã tồn tại'],
            },
          ]);
          toast.error('Tên dị ứng đã tồn tại!', { position: 'top-right' });
          setConfirmLoading(false);
          return;
        }

       
        await updateAllergy(allergyId, values);
        refetch();
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        toast.success('Cập nhật dị ứng thành công!', { position: 'top-right' });

      } catch (error) {
        console.error('Error updating allergy:', error);
        toast.error('Lỗi khi cập nhật dị ứng!', { position: 'top-right' });
        setConfirmLoading(false);
      }
    }).catch((errorInfo) => {
      console.log('Validate Failed:', errorInfo);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const fetchAllergyData = async () => {
        try {
          const response = await getAllergyById(allergyId);
          setCurrentAllergy(response.data);
          form.setFieldsValue({
            allergyName: response.data?.allergyName,
            notes: response.data?.notes,
          });
        } catch (error) {
          console.error('Error fetching allergy data:', error);
        }
      };
      fetchAllergyData();
    }
  }, [open, allergyId, form]);

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
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Xác nhận 
          </Button>,
        ]}
      >
        <UpdateAllergyForm form={form} />
      </Modal>
    </>
  );
};

export default UpdateAllergyModal;
