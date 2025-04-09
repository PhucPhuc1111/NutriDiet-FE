import { Button, Modal, Form } from "antd";
import { useState } from "react";
import AddIngredientForm from "./Form/AddIngredientForm";
import { useQueryClient } from "@tanstack/react-query";
import { createIngredient } from "@/app/data";
import { toast } from "react-toastify";

const AddIngredientModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      console.log("Form Values:", values);
      setConfirmLoading(true);

      try {
        const existingIngredients: any[] = queryClient.getQueryData(["ingredients"]) || [];


        const isDuplicate = existingIngredients.some(
          (ingredient: any) => ingredient.ingredientName.toLowerCase() === values.ingredientName.toLowerCase()
        );

        if (isDuplicate) {
          form.setFields([
            {
              name: "ingredientName",
              errors: ["Tên nguyên liệu đã tồn tại"],
            },
          ]);
          setConfirmLoading(false);
          return;
        }

       
        await createIngredient(values);
        toast.success("Thêm nguyên liệu thành công");
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields(); // Reset form fields after successful creation
        queryClient.invalidateQueries({ queryKey: ["ingredients"] }); 
      } catch (error) {
        toast.error("Tên nguyên liệu đã tồn tại");
        setConfirmLoading(false);
      }
    }).catch((errorInfo) => {
      console.log('Validate Failed:', errorInfo);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false); // Close modal
  };

  const handleReset = () => {
    form.resetFields(); // Reset all fields of the form
  };

  return (
    <>
      <Button style={{ backgroundColor: "#2f855a", color: "white" }} onClick={showModal}>
        Thêm nguyên liệu
      </Button>
      <Modal
        title="Thêm nguyên liệu"
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
          <Button key="submit" style={{ backgroundColor: '#2f855a', color: 'white' }} loading={confirmLoading} onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <AddIngredientForm form={form} />
      </Modal>
    </>
  );
};

export default AddIngredientModal;
