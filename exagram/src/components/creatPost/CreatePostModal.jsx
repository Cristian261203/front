import React, { useState } from 'react';
import './CreatePostModal.scss';
import { useUser } from '../../context/UserContext';
import { usePosts } from '../../routes/usePosts';

const CreatePostModal = ({ onClose, onPostCreated }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData } = useUser(); 
    const { createPost } = usePosts(); // 使用 usePosts 钩子

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleShare = async () => {
        if (!selectedFile) { // 确保选择了文件
            alert('请选择一张图片');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('content', content); // 即使内容为空也会附加到请求中

        try {
            const newPost = await createPost(formData); // 使用 createPost 函数创建帖子
            onPostCreated(newPost); // 调用回调函数通知父组件
            setSelectedFile(null);
            setContent('');
            onClose(); // 关闭模态框
        } catch (error) {
            alert('创建帖子时出错，请稍后再试。');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className={`modal-content ${selectedFile ? 'expanded' : ''}`}>
                <button className="close-button" onClick={onClose} disabled={loading}>×</button>
                <div className="post-left">
                    {selectedFile ? (
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="selected-image" />
                    ) : (
                        <div className="upload-area">
                            <div className="upload-icon">
                                <img src="/path/to/your/icon.png" alt="上传图标" />
                            </div>
                            <p>把照片和视频拖放到这里</p>
                            <input 
                                type="file" 
                                onChange={handleFileSelect}
                                style={{ display: 'none' }} 
                                id="fileInput"
                            />
                            <label htmlFor="fileInput" className="upload-button">
                                从电脑中选择
                            </label>
                        </div>
                    )}
                </div>
                {selectedFile && (
                    <div className="post-right">
                        <div className="author-info">
                            <img src={userData?.avatar || '/path/to/default/avatar.png'} alt="avatar" className="avatar"/>
                            <span className="username">{userData?.username || 'Unknown User'}</span>
                        </div>
                        <textarea 
                            placeholder="添加评论..." 
                            className="comment-box"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={loading}
                        ></textarea>
                        <button 
                            className="share-button" 
                            onClick={handleShare} 
                            disabled={loading}
                        >
                            {loading ? 'Sharing...' : 'Share'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePostModal;
