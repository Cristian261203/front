import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { RxExit } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../routes/usePosts'; 
import CreatePostModal from '../../components/creatPost/CreatePostModal';  
import SearchModal from '../../components/Search/SearchModal';  // 导入搜索弹窗组件

function Navbar() {
    const navigate = useNavigate();
    const { userData } = useUser(); 
    const { fetchPosts } = usePosts();  // 获取 fetchPosts 方法
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);  // 添加状态控制搜索弹窗

    const handleExit = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userPosts');
        navigate('/');
    };

    const toggleCreateModal = () => {
        setIsCreateModalOpen(!isCreateModalOpen);
    };

    const toggleSearchModal = () => {
        setIsSearchModalOpen(!isSearchModalOpen);
    };

    const handleProfileClick = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            await fetchPosts(token);  // 在导航到 Profile 页面之前获取帖子
            navigate('/profile');
        }
    };

    return (
        <div>
            <div className="navbar">
                <div className="logoName" onClick={() => navigate('/home')}>EXAGRAM</div>
                <div className="navItem" onClick={() => navigate('/home')}>
                    <MdOutlineExplore className="navIcon" />
                    <span>Home</span>
                </div>
                <div className="navItem" onClick={toggleSearchModal}>  {/* 点击时切换搜索弹窗显示 */}
                    <IoSearch className="navIcon" />
                    <span>Search</span>
                </div>
                <div className="navItem" onClick={toggleCreateModal}>
                    <FaRegPlusSquare className="navIcon" />
                    <span>Create</span>
                </div>
                <div className="navItem" onClick={handleProfileClick}>  {/* 处理 Profile 按钮点击事件 */}
                    {userData && userData.avatar ? (
                        <img
                            src={`http://127.0.0.1:8000${userData.avatar}`} 
                            alt="User Avatar"
                            className="navAvatar"  
                        />
                    ) : (
                        <div className="navAvatarPlaceholder"></div>
                    )}
                    <span>Profile</span>
                </div>
                <div className="navItem navMore" onClick={handleExit}>
                    <RxExit className="navIcon" />
                    <span>Exit</span>
                </div>
            </div>
            {isCreateModalOpen && <CreatePostModal onClose={toggleCreateModal} />}  {/* 渲染创建帖子的弹窗 */}
            {isSearchModalOpen && <SearchModal onClose={toggleSearchModal} />}  {/* 渲染搜索弹窗 */}
        </div>
    );
}

export default Navbar;
