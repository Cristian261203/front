import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { PostsContext } from '../context/PostsContext';
import { getCSRFToken } from '../api';  

export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUserData } = useUser();
    const { setPosts } = useContext(PostsContext);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const fetchUserDataAndPosts = async (token) => {
        try {
            const csrftoken = getCSRFToken(); // 动态获取 CSRF Token

            const profileResponse = await axios.get('http://127.0.0.1:8000/users/api/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrftoken, // 传递 CSRF Token
                },
                withCredentials: true,
            });
    
            const { username, bio, followers_count, avatar, following_count } = profileResponse.data;
            const userData = {
                username,
                bio,
                avatar,
                followersCount: followers_count,
                followingCount: following_count,
            };
    
            setUserData(userData);
            localStorage.setItem('userData', JSON.stringify(userData)); // 将用户数据保存到localStorage
    
            const postsResponse = await axios.get('http://127.0.0.1:8000/posts/api/posts/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrftoken, // 传递 CSRF Token
                },
                withCredentials: true,
            });
    
            setPosts(postsResponse.data);
        } catch (error) {
            console.error("Failed to fetch user details or posts:", error);
            console.error("Error Response:", error.response); // 打印完整的错误响应
            console.error("Error Message:", error.message); // 打印错误信息
            setError("Failed to fetch user details or posts. Please try again later.");
        }
    };
    
    const searchPostsByAuthor = async (authorUsername) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const csrftoken = getCSRFToken(); // 动态获取 CSRF Token

            const response = await axios.get(`http://127.0.0.1:8000/posts/api/posts/?author=${authorUsername}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrftoken, // 传递 CSRF Token
                },
                withCredentials: true,
            });

            setPosts(response.data);
        } catch (error) {
            console.error("Failed to search posts by author:", error);
            setError("Failed to search posts by author. Please try again later.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const csrftoken = getCSRFToken(); // 动态获取 CSRF Token
            console.log('CSRF Token:', csrftoken);  // 调试 CSRF Token
    
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken, // 传递 CSRF Token
                },
                withCredentials: true,
            });
    
            if (response.status === 200) {
                const token = response.data.access;
                console.log('Authorization Token:', token);  // 调试 Authorization Token
                localStorage.setItem('authToken', token);
    
                await fetchUserDataAndPosts(token);
    
                navigate('/home');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('There was an error!', error);
            setError('Invalid username or password');
        }
    };
    
    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit,
        handleRegisterClick,
        fetchUserDataAndPosts,
        searchPostsByAuthor // 新增的搜索作者功能导出
    };
};
