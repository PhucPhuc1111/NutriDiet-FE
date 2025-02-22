import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { deleteFoodById } from '@/app/data';
import { toast } from 'react-toastify';

const DeleteFoodModal: React.FC<{ foodId: number; refetch: () => void }> = ({ foodId, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  
    const handleDelete = async () => {
      setConfirmLoading(true);
      try {
        await deleteFoodById(foodId);
        refetch(); // Làm mới danh sách sau khi xóa
        setConfirmLoading(false);
        toast.success("Xóa thực phẩm thành công!");
      } catch (error) {
        toast.error("Xóa thực phẩm không thành công!");
        setConfirmLoading(false);
      }
    };
  
    const handleCancel = () => {
      console.log("Hủy xóa thực phẩm");
    };
  
    return (
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa thực phẩm này?"
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
  
  export default DeleteFoodModal;