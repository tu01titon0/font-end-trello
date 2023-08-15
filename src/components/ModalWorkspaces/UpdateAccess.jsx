import  { useState } from 'react';
import { Button, Modal } from 'antd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';



const ModalAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button style={{backgroundColor:"#1d2125"}} type="primary" onClick={showModal}>
      <ManageAccountsIcon style={{color:"white"}}/>
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <Button style={{border:0}}>
      <div>
      <PeopleAltIcon style={{color:"black", padding:0}}></PeopleAltIcon>
      <p> Tất cả mọi người đều có thể xem được.</p>
      </div>
      </Button>

      </Modal>
    </>
  );
};

export default ModalAccess;