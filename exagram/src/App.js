import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/')
      .then(response => setData(response.data)) // 使用响应数据更新 state
      .catch(error => console.error('Error fetching data:', error)); // 错误处理
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
