import React, { createContext, useState, useEffect } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState(() => {
        // 从 localStorage 中恢复帖子数据
        const savedPosts = localStorage.getItem('userPosts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });

    useEffect(() => {
        if (posts.length > 0) {
            // 每当帖子数据变化时，将其保存到 localStorage
            localStorage.setItem('userPosts', JSON.stringify(posts));
        }
    }, [posts]);

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    );
};
