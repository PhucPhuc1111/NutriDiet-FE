// import { Button, Modal, Form } from 'antd';
// import { useState } from 'react';
// import UpdateFoodForm from './Form/UpdateFoodForm';


// const UpdateFoodModal: React.FC = () => {
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const [form] = Form.useForm();

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     form
//       .validateFields() 
//       .then((values) => {
//         console.log('Form Values:', values);
//         setConfirmLoading(true); 
//         setTimeout(() => {
//           setOpen(false); 
//           setConfirmLoading(false); 
//         }, 2000); 
//       })
//       .catch((errorInfo) => {
//         console.log('Validate Failed:', errorInfo);
//         setConfirmLoading(false); 
//       });
//   };

//   const handleCancel = () => {
//     console.log('Clicked cancel button');
//     setOpen(false); // Đóng modal
//   };

//   const handleReset = () => {
//     form.resetFields(); 
//   };

//   return (
//     <>
//       <Button style={{ backgroundColor: '#2f855a', color: 'white' }} onClick={showModal}>
//         Sửa
//       </Button>
//       <Modal
//         title="Sửa"
//         open={open}
//         onOk={handleOk}
//         width={800}
//         confirmLoading={confirmLoading} 
//         onCancel={handleCancel}
//         footer={[
//           <Button key="reset" onClick={handleReset} style={{ marginRight: 10 }}>
//             Tạo lại
//           </Button>,
//           <Button key="cancel" onClick={handleCancel} style={{ marginRight: 10 }}>
//             Hủy
//           </Button>,
//           <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
//             Xác nhận
//           </Button>, 
//         ]}
//       >
//         <UpdateFoodForm form={form} />
//       </Modal>
//     </>
//   );
// };

// export default UpdateFoodModal;
