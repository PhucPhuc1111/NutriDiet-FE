import { Button, Modal, Form } from 'antd';
import { useState } from 'react';
import AddFoodForm from './Form/AddFoodForm';


const AddFoodModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields() // Kiểm tra xem có trường nào bị thiếu thông tin hay không
      .then((values) => {
        console.log('Form Values:', values); // Xử lý khi form hợp lệ
        setConfirmLoading(true); // Bật trạng thái loading
        setTimeout(() => {
          setOpen(false); // Đóng modal sau khi submit thành công
          setConfirmLoading(false); // Tắt trạng thái loading
        }, 2000); // Giả lập tác vụ xử lý, bạn có thể thay bằng thực tế gọi API hoặc xử lý dữ liệu
      })
      .catch((errorInfo) => {
        console.log('Validate Failed:', errorInfo); // Nếu validate thất bại, không làm gì cả
        setConfirmLoading(false); // Tắt trạng thái loading nếu có lỗi
      });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false); // Đóng modal
  };

  const handleReset = () => {
    form.resetFields(); // Reset tất cả các trường của form
  };

  return (
    <>
      <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
        Thêm thực phẩm
      </Button>
      <Modal
        title="Thêm thực phẩm"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading} // Đảm bảo confirmLoading được truyền vào Modal
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={handleReset} style={{ marginRight: 10 }}>
            Reset
          </Button>,
          <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Submit
          </Button>, // Thêm loading cho nút submit khi confirmLoading là true
        ]}
      >
        <AddFoodForm form={form} />
      </Modal>
    </>
  );
};

export default AddFoodModal;
