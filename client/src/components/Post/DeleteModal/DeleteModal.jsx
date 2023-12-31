import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import './deleteModal.css'
import { useContext, useState } from 'react';
import { PostDeleteModalContext } from '../../../context/PostDeleteModal/PostDeleteModalContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'grey.400',
  border: '2px solid grey.400',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px'
};

export default function BasicModal({post, currentUser, open, handleOpen, setOpen}) {

  // const {open, handleClose} = useContext(PostDeleteModalContext)
  console.log(post.userId, "->>> 1")
  console.log(currentUser._id, "-->>>2")

    const handleDeletePost = async () => {
        if (post.userId === currentUser._id){
            try{
                await axios.delete("/posts/"+post._id, { data: { userId: currentUser._id }})
            } catch(err){
                console.log(err)
            }
            handleClose()
            window.location.reload()
        }else{
            handleClose()
            alert("cannot delete others post")
        }
      }

      const handleClose = () => {
        setOpen(false)
      }

     

  return (
    <div className='deleteModal'>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="deleteModalRight">
                <button className="deleteModalRightClose" onClick={handleClose}>Close</button>
            </div>
            <div className="deleteDialogueContainer">
                <div className="deleteDialogueMessage">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this?
                    </Typography>
                </div>
            
                <div className="deleteDialogueButton">
                    <Button onClick={handleDeletePost} color="error"> Delete</Button>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}