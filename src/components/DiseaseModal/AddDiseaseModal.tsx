import { Button, Modal, Form } from 'antd';
import { useState } from 'react';

import {createDisease } from "@/app/data/disease";  
import { useQueryClient } from "@tanstack/react-query"; 

import { toast } from 'react-toastify';
import AddDiseaseForm from './Form/AddDiseaseForm';

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
        
        const existingDiseases: any[] = queryClient.getQueryData(["diseases"]) || [];

        const isDuplicate = existingDiseases.some(
          (disease: any) => disease.diseaseName.toLowerCase() === values.diseaseName.toLowerCase()
        );
  
        if (isDuplicate) {
          form.setFields([
            {
              name: "diseaseName",
              errors: ["Tên bệnh đã tồn tại"],
            },
          ]);
          setConfirmLoading(false);
          return;
        }
        const formattedData = {
          DiseaseName: values.diseaseName,
          Description: values.description,
          ingredientIds: values.ingredientIds || [],
        
        };

        await createDisease(formattedData);
        toast.success("Thêm bệnh thành công");
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["diseases"] });
      } catch (error) {
        toast.error("Bệnh đã tồn tại");
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
        Thêm bệnh
      </Button>
      <Modal
        title="Thêm bệnh"
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
