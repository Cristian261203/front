import React, { useState, useEffect } from 'react';
import './Explore.scss';
import Navbar from '../components/navbar/NavBar'; 

const Explore = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // 从 localStorage 获取帖子数据
        const storedPosts = localStorage.getItem('userPosts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    return (
        <div className="explore-page">
            <Navbar className="navbar" />
            <div className="explore-content">
                    {posts && posts.length > 0 ? (
                        posts.reduce((rows, post, index) => {
                            const rowIndex = Math.floor(index / 5);
                            if (!rows[rowIndex]) {
                                rows[rowIndex] = []; // start a new row
                            }
                            rows[rowIndex].push(
                                <div className="custom-post" key={index}>
                                    <img src={post.image} alt="Post" />
                                </div>
                            );
                            return rows;
                        }, []).map((row, rowIndex) => (
                            <div className="post-row" key={rowIndex}>
                                {row}
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
            </div>
        </div>
    );
};

export default Explore;
