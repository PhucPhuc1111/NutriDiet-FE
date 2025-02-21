"use client";
import { Button, Popconfirm } from "antd";
import { deleteDiseaseById } from "@/app/data/disease"; // API xóa bệnh nền
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteDiseaseModal: React.FC<{ diseaseId: number; refetch: () => void }> = ({ diseaseId, refetch }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteDiseaseById(diseaseId);
      refetch(); // Làm mới danh sách sau khi xóa
      setConfirmLoading(false);
      toast.success("Xóa bệnh nền thành công!");
    } catch (error) {
      toast.error("Xóa bệnh nền không thành công!");
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Hủy xóa bệnh nền");
  };

  return (
    <Popconfirm
      title="Bạn có chắc chắn muốn xóa bệnh nền này?"
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

export default DeleteDiseaseModal;
