import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useGetUsersByHomeQuery, useUpdateHomeUsersMutation } from '../features/usersApi';

const EditUserModal = ({ home, closeModal }) => {
    const { data: allUsers = [] } = useGetUsersQuery(); 
    const { data: homeUsers = [],refetch } = useGetUsersByHomeQuery(home.home_id); 
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [updateHomeUsers, { isLoading: isSaving }] = useUpdateHomeUsersMutation();


    useEffect(() => {
        setSelectedUsers(homeUsers.map((user) => user.username));
    }, [homeUsers]);

    const handleCheckboxChange = (user) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(user)
                ? prevSelected.filter((u) => u !== user)
                : [...prevSelected, user]
        );
    };

    const handleSave = async () => {
        if (selectedUsers.length === 0) {
            alert('At least one user must be selected');
            return;
        }
        await updateHomeUsers({ homeId: home.home_id, users: selectedUsers }).unwrap();
        refetch();  
        closeModal();
    };

    return (
        <div className="modal">
            <h3>Modify Users for: {home.street_address}</h3>
            <div className="user-list">
                {allUsers.map((user) => (
                    <label key={user.username}>
                        <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.username)}
                            onChange={() => handleCheckboxChange(user.username)}
                        />
                        {user.username}
                    </label>
                ))}
            </div>
            <div className="modal-actions">
                <button onClick={closeModal} disabled={isSaving}>Cancel</button>
                <button onClick={handleSave} disabled={selectedUsers.length === 0 || isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default EditUserModal;
