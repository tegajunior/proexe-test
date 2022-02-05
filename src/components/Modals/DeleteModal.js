import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/user-store';
import { uiActions } from '../../store/ui-store';
import ModalCover from '../UI/ModalCover';

const DeleteModal = (props) => {
  const id = useSelector((state) => state.users.deleteId);
  const dispatch = useDispatch();

  const deleteUserData = async () => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Pending',
        message: 'Please wait...',
      })
    );
    const res = await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
  };

  const onClickHandler = () => {
    props.deleteCancelled();
  };
  const deleteUser = () => {
    
    try {
      deleteUserData();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: 'Deleted',
          title: 'Completed',
        })
      );
      dispatch(userActions.deleteUser(id));
      props.deleteCancelled();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: error.message,
          title: 'Pending',
        })
      );
    }
  };
  return (
    <ModalCover>
      <div className="card my-auto">
        <h5 className="card-header">Delete {id}</h5>
        <div className="card-body">
          <h5 className="card-title">Confirm Action</h5>
          <p className="card-text">
            Are you sure you want to delete this user?
          </p>
          <div className="d-flex justify-content-end align-items-center gap-3">
            <button className="btn btn-primary" onClick={onClickHandler}>
              Cancel
            </button>
            <button className="btn btn-outline-danger" onClick={deleteUser}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </ModalCover>
  );
};

export default DeleteModal;
