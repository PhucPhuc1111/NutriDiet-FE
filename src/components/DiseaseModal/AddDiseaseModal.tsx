import { Button, Modal, Form } from 'antd';
import { useState } from 'react';
import { createDisease } from "@/app/data/disease";  
import { useQueryClient } from "@tanstack/react-query"; 
import AddDiseaseForm from './Form/AddDiseaseForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDiseaseModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient(); 

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      console.log('Form Values:', values);
      setConfirmLoading(true);
  
      try {
        // Lấy danh sách bệnh hiện có để kiểm tra trùng lặp
        const existingDiseases: any[] = queryClient.getQueryData(["diseases"]) || [];

        const isDuplicate = existingDiseases.some(
          (disease: any) => disease.diseaseName.toLowerCase() === values.diseaseName.toLowerCase()
        );
  
        if (isDuplicate) {
          form.setFields([
            {
              name: "diseaseName",
              errors: ["Tên bệnh nền đã tồn tại"],
            },
          ]);
          setConfirmLoading(false);
          return;
        }
  
        // Gọi API để tạo bệnh mới
        await createDisease(values);
        toast.success("Thêm bệnh nền thành công");
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["diseases"] }); // Làm mới danh sách bệnh nền
      } catch (error) {
        toast.error("Bệnh nền đã tồn tại");
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

  const handleReset = () => {
    form.resetFields(); 
  };

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
        Thêm bệnh nền
      </Button>
      <Modal
        title="Thêm bệnh nền"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={handleReset} style={{ marginRight: 10 }}>
            Tạo lại
          </Button>,
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <AddDiseaseForm form={form} />
      </Modal>
    </>
  );
};

export default AddDiseaseModal;
