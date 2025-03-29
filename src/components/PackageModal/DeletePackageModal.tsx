import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { deleteIngredientById } from '@/app/data';
import { deletePackageById } from '@/app/data/package';

const DeletePackageModal: React.FC<{
  packageId: number;
  refetch: () => void;
}> = ({ packageId, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deletePackageById(packageId);
      refetch();
      setConfirmLoading(false);

      toast.success("Xóa gói thành công");
    } catch (error) {
      toast.error("Xóa gói không thành công");
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };
  return (
    <Popconfirm
    title="Bạn có chắc chắn muốn xóa gói này?"
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

export default DeletePackageModal;