import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/NavBar';
import Post from '../components/post/Post';
import './ProfilePage.scss';
import { useUser } from '../context/UserContext';

function Profile() {
    const { userData } = useUser();  
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        console.log('User Data:', userData);

        // 从 localStorage 获取帖子数据
        const storedPosts = localStorage.getItem('userPosts');
        if (storedPosts) {
            setUserPosts(JSON.parse(storedPosts));
        }
    }, [userData]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-body">
            <Navbar className="navbar" />
            <div className="container">
                <div className="profile-container">
                    <div className="profile-picture">
                        {userData.avatar && (
                            <img 
                                src={`http://127.0.0.1:8000${userData.avatar}`}
                                alt="Profile Avatar" 
                            />
                        )}
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{userData.username || 'Username'}</h1>
                        <p className="profile-id">ID: {userData.id || 'Unknown ID'}</p>
                        <p className="profile-bio">{userData.bio || 'No bio available'}</p>
                        <div className="profile-stats">
                            <span>{userData.followingCount || 0} Following</span>
                            <span>{userData.followersCount || 0} Followers</span>
                            <span>{userData.likes?.length || 0} Likes & Saves</span>
                        </div>
                    </div>
                </div>
                <div className="posts-container">
                    {userPosts && userPosts.length > 0 ? (
                        userPosts.map((post, index) => (
                            <Post 
                                key={index}
                                imageUrl={`${post.image}`} 
                                description={post.content} 
                                likes={post.likes} 
                            />
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
