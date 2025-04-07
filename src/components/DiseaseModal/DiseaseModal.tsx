import { Button, Modal, Form, Spin, message } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DetailDiseaseForm from "./Form/DetailDiseaseForm";
import { useGetDiseaseById, updateDisease, useGetAllDiseases, getDiseaseById } from "@/app/data"; 

const DiseaseModal: React.FC<{ diseaseId: number; refetch: () => void }> = ({ diseaseId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [form] = Form.useForm();
  const [currentDisease, setCurrentDisease] = useState<any>(null);

  const { data: allDiseases } = useGetAllDiseases(1, 500, "");

  // Mở modal
  const showDetailModal = () => {
    setIsEditing(false);
    setOpen(true);
  };

  // Bật chế độ chỉnh sửa
  const enableEdit = () => {
    setIsEditing(true);
  };

  // Đóng modal và reset form về giá trị ban đầu
  const handleCancel = () => {
    setOpen(false);
    setIsEditing(false);
    form.resetFields(); // Reset form khi đóng modal
  };

  // Xử lý khi lưu dữ liệu
  const handleSave = async () => {
    form.validateFields().then(async (values) => {
      setLoadingSave(true);
      try {
        // Kiểm tra tên bệnh trùng
        const isDuplicate = allDiseases?.some(
          (disease) => disease.diseaseName === values.diseaseName && disease.diseaseId !== diseaseId
        );

        if (isDuplicate) {
          // Nếu trùng tên, hiển thị thông báo lỗi nhưng vẫn tiếp tục
          console.error("Tên bệnh đã tồn tại, vui lòng chọn tên khác!");
        }

        // Payload gửi lên API
        const payload = {
          DiseaseId: Number(diseaseId),
          DiseaseName: values.diseaseName ?? currentDisease?.diseaseName,
          Description: values.description ?? currentDisease?.description,
          ingredientIds: values.ingredientIds ? [...values.ingredientIds] : [],
        };

        await updateDisease(payload); // Gửi yêu cầu API để cập nhật bệnh
        toast.success("Cập nhật bệnh thành công!"); // Hiển thị thông báo thành công
        setOpen(false);
        refetch();
      } catch (error) {
        console.error("Lỗi khi cập nhật bệnh:", error);
        toast.error("Tên bệnh đã tồn tại!"); // Hiển thị thông báo lỗi nếu có lỗi API
      } finally {
        setLoadingSave(false); // Tắt trạng thái loading
      }
    }).catch((errorInfo) => {
      console.log("Validate Failed:", errorInfo);
      setLoadingSave(false);
    });
  };

  useEffect(() => {
    if (open) {
      const fetchDiseaseData = async () => {
        try {
          const response = await getDiseaseById(diseaseId);
          setCurrentDisease(response.data);
          // Cập nhật giá trị form khi dữ liệu bệnh được tải
          form.setFieldsValue({
            diseaseName: response.data?.diseaseName,
            description: response.data?.description,
            ingredientIds: response.data?.ingredients?.map((ingredient: any) => ingredient.ingredientId) || [],
          });
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu bệnh:", error);
        }
      };
      fetchDiseaseData();
    }
  }, [open, diseaseId, form]); // Re-fetch dữ liệu khi modal mở

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showDetailModal}>Chi tiết</Button>
      <Modal
        title={isEditing ? "Sửa bệnh" : "Chi tiết bệnh"}
        open={open}
        width={800}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          isEditing ? (
            <>
              <Button key="cancel" onClick={handleCancel}>Hủy</Button>
              <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={handleSave} loading={loadingSave}>Lưu</Button>
            </>
          ) : (
            <Button key="edit" style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={enableEdit}>Sửa</Button>
          )
        ]}
      >
        <DetailDiseaseForm form={form} isEditing={isEditing} diseaseId={diseaseId} />
      </Modal>
    </>
  );
};

export default DiseaseModal;
