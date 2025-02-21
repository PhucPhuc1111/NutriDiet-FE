import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { deleteIngredientById } from '@/app/data';

const DeleteIngredientModal: React.FC<{
  ingredientId: number;
  refetch: () => void;
}> = ({ ingredientId, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteIngredientById(ingredientId);
      refetch();
      setConfirmLoading(false);

      toast.success("Xóa dị ứng thành công");
    } catch (error) {
      toast.error("Xóa dị ứng không thành công");
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
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

export default DeleteIngredientModal;