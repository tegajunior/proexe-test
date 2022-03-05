import React, { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/user-store';
import { fetchUserData } from '../store/user-actions';
import { NavLink } from 'react-router-dom';
import DeleteModal from '../components/Modals/DeleteModal';

let firstTime = true;

const Home = () => {
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const usersList = useSelector((state) => state.users.items);
  const dispatch = useDispatch();

  const onClickDelete = (id) => {
    dispatch(userActions.setDeleteId(id))
    toggleShowDeleteModal((prevState) => !prevState);
  };

  const onDeleteCancelled = () => {
    toggleShowDeleteModal((prevState) => !prevState);
  }

  const sortAsc = () => {
    dispatch(userActions.sortItems("ASC"));
  }
  const sortDesc = () => {
    dispatch(userActions.sortItems("DESC"));
  }
  const sortId = () => {
    dispatch(userActions.sortItems("Id"))
  }
  useEffect(() => {
    if (firstTime) {
      firstTime = false;
      dispatch(fetchUserData());
    }
  }, [dispatch]);
  if (usersList.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <h5 className="mt-5 ml-5">No users, please refresh page.</h5>
      </div>
    );
  }
  return (
    <div className="card mt-5 w-100 mx-auto">
      <div className="card-header d-flex justify-content-between align-items-center py-3">
        <h5 className="card-title">User list</h5>
        <NavLink to="/user">
          <button className="btn btn-success btn-sm">Add new</button>
        </NavLink>
      </div>
      <div className="card-body p-4">
        <table className="table table-striped table-responsive">
          <thead className="thead-light">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td className="">
                  <NavLink to={`/user/${user.id}`}>
                    <button className="btn btn-warning btn-sm">edit</button>
                  </NavLink>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={onClickDelete.bind(null, user.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <button className="btn btn-outline-warning" onClick={sortAsc}>
            Sort &gt;&gt;
          </button>
          <button className="btn btn-outline-info" onClick={sortDesc}>
            Sort &lt;&lt;
          </button>
          <button className="btn btn-outline-secondary" onClick={sortId}>
            Refresh
          </button>
        </div>
      </div>
      {showDeleteModal && <DeleteModal deleteCancelled={onDeleteCancelled} />}
    </div>
  );
};

export default Home;
