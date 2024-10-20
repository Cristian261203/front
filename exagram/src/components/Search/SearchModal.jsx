import React, { useState } from 'react';
import './SearchModal.scss';
import axios from 'axios';
import { getCSRFToken } from '../../api';
import { AiOutlineClose } from 'react-icons/ai'; // 引入关闭按钮图标

function SearchModal({ onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const csrfToken = getCSRFToken();

            const userResponse = await axios.get(`http://127.0.0.1:8000/users/api/search/?query=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrfToken, 
                },
                withCredentials: true,
            });

            setSearchResults(userResponse.data);
            setError('');
        } catch (err) {
            console.error('Search failed', err);

            if (err.response) {
                setError(`Error: ${err.response.status} - ${err.response.data}`);
            } else if (err.request) {
                setError('Error: No response from server. Please check your network connection.');
            } else {
                setError(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="search-modal-overlay">
            <div className="search-modal-content">
                <AiOutlineClose className="search-close-button" onClick={onClose} />
                <div className="search-modal-container">
                    <form onSubmit={handleSearchSubmit} className="search-modal-form">
                        <input
                            type="text"
                            className="search-modal-input"
                            placeholder="Search by username..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </form>
                    {error && <p className="search-modal-error">{error}</p>}
                    <div className="search-modal-results">
                        {searchResults.length > 0 ? (
                            searchResults.map((user) => (
                                <div key={user.id} className="search-modal-result-item">
                                    <img 
                                        src={`http://127.0.0.1:8000${user.avatar}`} 
                                        alt={user.username} 
                                        className="search-modal-avatar-image"
                                    />
                                    <span>{user.username}</span>
                                </div>
                            ))
                        ) : (
                            <p>No users found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchModal;
