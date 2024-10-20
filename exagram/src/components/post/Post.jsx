import React from 'react';
import './Post.scss';

function Post({ imageUrl }) {
    return (
        <div className="post">
            <img 
                src={imageUrl || 'path-to-default-image.jpg'} 
                alt="Post Image"
                className="post-image"
            />
        </div>
    );
}

export default Post;
