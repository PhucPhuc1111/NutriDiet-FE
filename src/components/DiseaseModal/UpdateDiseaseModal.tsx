import { Button, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { getDiseaseById, updateDisease, useGetAllDiseases } from '@/app/data/disease';
import UpdateDiseaseForm from './Form/UpdateDiseaseForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDiseaseModal: React.FC<{ diseaseId: number; refetch: () => void }> = ({ diseaseId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentDisease, setCurrentDisease] = useState<any>(null);

  const showModal = () => {
    setOpen(true);
  };

  const { data: allDiseasesData } = useGetAllDiseases(1, 100, 'your-token-here');

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);

      try {
      
        const allDiseases = allDiseasesData || [];
        const isDuplicate =
  values.diseaseName.toLowerCase() !== currentDisease?.diseaseName.toLowerCase() && // Kiểm tra nếu tên đã thay đổi
  allDiseases.some(
    (disease: any) =>
      disease.diseaseName.toLowerCase() === values.diseaseName.toLowerCase() &&
      disease.id !== diseaseId
  );


        if (isDuplicate) {
          form.setFields([
            {
              name: 'diseaseName',
              errors: ['Tên bệnh đã tồn tại'],
            },
          ]);
          toast.error('Tên bệnh đã tồn tại!', { position: 'top-right' });
          setConfirmLoading(false);
          return;
        }

        // Cập nhật bệnh
        await updateDisease(diseaseId, values, 'your-token-here');
        refetch(); // Làm mới danh sách
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        toast.success('Cập nhật bệnh thành công!', { position: 'top-right' });

      } catch (error) {
        console.error('Error updating disease:', error);
        toast.error('Lỗi khi cập nhật bệnh!', { position: 'top-right' });
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
      const fetchDiseaseData = async () => {
        try {
          const response = await getDiseaseById(diseaseId);
          setCurrentDisease(response?.data);
          form.setFieldsValue({
            diseaseName: response.data?.diseaseName,
            description: response.data?.description,
          });
        } catch (error) {
          console.error('Error fetching disease data:', error);
        }
      };
      fetchDiseaseData();
    }
  }, [open, diseaseId, form]);

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
        Sửa
      </Button>
      <Modal
        title="Sửa Bệnh"
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
        <UpdateDiseaseForm form={form} />
      </Modal>
    </>
  );
};

export default UpdateDiseaseModal;
