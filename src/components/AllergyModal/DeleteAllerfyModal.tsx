"use client";
import { Button, Popconfirm } from "antd";
import { deleteAllergyById } from "@/app/data/allergy"; // Hàm gọi API xóa dị ứng
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteAllergyModal: React.FC<{
  allergyId: number;
  refetch: () => void;
}> = ({ allergyId, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteAllergyById(allergyId.toString(), "your-token-here");
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

export default DeleteAllergyModal;
