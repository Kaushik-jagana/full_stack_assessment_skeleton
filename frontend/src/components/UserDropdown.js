import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetUsersQuery } from '../features/usersApi';
import { selectUser } from '../features/homesSlice';

const UserDropdown = () => {
    const { data: users = [], isLoading } = useGetUsersQuery();
    const dispatch = useDispatch();

    const handleUserChange = (e) => {
        dispatch(selectUser(e.target.value));
    };

    if (isLoading) return <div>Loading users...</div>;

    return (
        <select onChange={handleUserChange}>
            <option value="">Select User</option>
            {users.map((user) => (
                <option key={user.username} value={user.username}>
                    {user.username}
                </option>
            ))}
        </select>
    );
};

export default UserDropdown;
