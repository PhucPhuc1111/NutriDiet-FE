import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { deleteMealPlanById } from '@/app/data';

const DeleteMealPlanModal: React.FC<{
  mealPlanId: number;
  refetch: () => void;
}>  = ({ mealPlanId, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteMealPlanById(mealPlanId);
      refetch();
      setConfirmLoading(false);

      toast.success("Xóa thực đơn thành công");
    } catch (error) {
      toast.error("Xóa thực đơn không thành công");
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };
  return (
     <Popconfirm
       title="Bạn có chắc chắn muốn xóa thực đơn này?"
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

export default DeleteMealPlanModal;