import { useEffect, useState } from "react";
import * as userAPI from "../api/userAPI";
import UserListItem from "./UserListItem";
import CreateUserModal from "./CreateUserModal";
import UserInfoModal from "./UserInfoModal";
import UserDeleteModal from "./UserDeleteModal";

export default function UserListTable() {
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserInfoNodal, setShowInfoUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    userAPI
      .getAll()
      .then((result) => setUsers(result))
      .catch((err) => console.error(err));
  }, []);

  const createUserClickHandler = () => {
    setShowUserModal(true);
  };

  const hideCreateUserModal = () => {
    setShowUserModal(false);
  };

  const userCreateHandler = async (event) => {
    // Stop page from refreshing
    event.preventDefault();
    // Get data from form data
    const data = Object.fromEntries(new FormData(event.currentTarget));
    // Create new user at the server
    const newUser = await userAPI.create(data);
    // Add newly created user to the local state
    setUsers((users) => [...users, newUser]);
    // Close the modal
    setShowUserModal(false);
  };

  const userInfoClickHandler = async (userId) => {
    setSelectedUser(userId);
    setShowInfoUserModal(true);
  };

  const hideUserInfo = () => {
    setShowInfoUserModal(false);
  };

  const deleteUserClickHandler = (userId) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const deleteUserHandler = async () => {
    // remove user from server
    await userAPI.deleteOne(selectedUser);
    // remove user from state
    setUsers((state) => state.filter((user) => user._id !== selectedUser));
    // close user delete modal
    setShowDeleteModal(false);
  };

  const hideUserDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="table-wrapper">
      {showUserModal && (
        <CreateUserModal
          onClose={hideCreateUserModal}
          onUserCreate={userCreateHandler}
        />
      )}

      {showUserInfoNodal && (
        <UserInfoModal onClose={hideUserInfo} userId={selectedUser} />
      )}

      {showDeleteModal && (
        <UserDeleteModal
          onClose={hideUserDeleteModal}
          onDelete={deleteUserHandler}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Table row component --> */}
          {users.map((user) => (
            // <UserListItem {...user} />;
            <UserListItem
              key={user._id}
              userId={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              phoneNumber={user.phoneNumber}
              createdAt={user.createdAt}
              imageUrl={user.imageUrl}
              onUserInfoClick={userInfoClickHandler}
              onDeleteClick={deleteUserClickHandler}
            />
          ))}
        </tbody>
      </table>

      {/* <!-- New user button  --> */}
      <button className="btn-add btn" onClick={createUserClickHandler}>
        Add new user
      </button>
    </div>
  );
}
