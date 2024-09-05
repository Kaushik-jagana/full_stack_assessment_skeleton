import React, { useState } from 'react';
import EditUserModal from './EditUserModal';

const HomeCard = ({ home }) => {
    const [showModal, setShowModal] = useState(false);
    const sqft = home.sqft ? Number(home.sqft).toFixed(2) : 'N/A';
    return (
        <>
            {showModal && <div className="backdrop" onClick={() => setShowModal(false)}></div>}

            <div className="home-card">
                <h3>{home.street_address}</h3>
                <p><strong>List Price:</strong> ${home.list_price}</p>
                <p><strong>State:</strong> {home.state}</p>
                <p><strong>Zip:</strong> {home.zip}</p>
                <p><strong>Sqft:</strong> {home.sqft}</p>
                <p><strong>Beds:</strong> {home.beds}</p>
                <p><strong>Baths:</strong> {home.baths}</p>
                <button className="edit-btn" onClick={() => setShowModal(true)}>Edit Users</button>

                {showModal && (
                    <EditUserModal home={home} closeModal={() => setShowModal(false)} />
                )}
            </div>
        </>

    );
};

export default HomeCard;
