"use client"
import { Button, Popconfirm } from 'antd';
import { useSyncExternalStore } from 'react';
import { deleteAllergyById } from '@/app/data/allergy';  // Hàm gọi API xóa dị ứng
import { useState } from 'react';

const DeleteAllergyModal: React.FC<{ allergyId: number }> = ({ allergyId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
     
      await deleteAllergyById(allergyId.toString(), 'your-token-here'); 
      setConfirmLoading(false);
  
      console.log('Allergy deleted successfully');
    } catch (error) {
      console.error('Error deleting allergy:', error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
  };

  return (
    <Popconfirm
      title="Bạn có chắc chắn muốn xóa dị ứng này?"
      onConfirm={handleDelete}
      onCancel={handleCancel}
      okButtonProps={{ loading: confirmLoading }}
      cancelButtonProps={{ disabled: confirmLoading }}
    >
      <Button type="primary" danger>
        Xóa
      </Button>
    </Popconfirm>
  );
};

export default DeleteAllergyModal;
