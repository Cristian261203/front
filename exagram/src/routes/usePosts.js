import { useState, useContext } from 'react';
import axios from 'axios';
import { PostsContext } from '../context/PostsContext';
import { getCSRFToken } from '../api';  // 假设你有一个函数获取 CSRF Token

export const usePosts = () => {
    const [error, setError] = useState('');
    const { setPosts } = useContext(PostsContext);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.get('http://127.0.0.1:8000/api/posts/', {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
                withCredentials: true,  // 如果需要发送 Cookie 凭证
            });

            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            setError("Failed to fetch posts. Please try again later.");
        }
    };

    const createPost = async (postData) => {
        try {
            const token = localStorage.getItem('authToken');
            console.log('Auth Token:', token); // 检查令牌是否正确

            if (!token) {
                throw new Error('User is not authenticated');
            }

            const csrfToken = await getCSRFToken();  // 获取 CSRF 令牌，假设你在使用 CSRF 保护

            const response = await axios.post('http://127.0.0.1:8000/posts/api/posts/', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrfToken,  // 如果你使用了 CSRF 保护，保留这行
                },
                withCredentials: true,  // 如果你依赖 Cookie 进行认证或跨域请求
            });

            if (response.status === 201) {
                fetchPosts(); // 重新获取帖子以刷新列表
            } else {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            console.error('There was an error creating the post!', error);
            setError('Failed to create post. Please try again later.');
        }
    };

    return {
        error,
        fetchPosts,
        createPost,
    };
};
