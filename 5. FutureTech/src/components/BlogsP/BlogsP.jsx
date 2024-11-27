import React, { useState } from 'react';
import Dividers from '../Dividers/Dividers';
import './Blogsp.css';
import { assets } from '../../assets/assets';
import { blogsData, blogCategories } from './Data';

const BlogsP = () => {
  // State for managing the like status of each blog
  const [likedPosts, setLikedPosts] = useState({});
  
  // State for the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle the click event for the like button (toggle like for a specific blog)
  const handleLikeClick = (blogId) => {
    setLikedPosts((prevLikes) => ({
      ...prevLikes,
      [blogId]: !prevLikes[blogId], // Toggle the like status for this specific blog
    }));
  };

  // Filter blogs based on the selected category
  const filteredBlogs = blogsData.filter((blog) => {
    if (selectedCategory === "All") {
      return true; // Show all blogs if "All" is selected
    }
    return blog.topic === selectedCategory; // Only show blogs that match the selected category
  });

  return (
    <>
      <Dividers
        title="Explore FutureTech's In-Depth Blog Posts"
        subtitle="A Knowledge Treasure Trove"
        linktext="View All Blogs"
        id="blogp"
      />
      <div className="blogp">
        <div className="category">
          {blogCategories.map((category, index) => (
            <div
              key={index}
              className={`cards ${category === selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="blogs">
          {filteredBlogs.map((blog) => {
            const isLiked = likedPosts[blog.id] || false;

            return (
              <div key={blog.id} className={`user-blog div${blog.id}`}>
                <div className="user">
                  <div className="user-img">
                    <img src={assets[blog.img]} alt={blog.username} />
                  </div>
                  <div className="user-text">
                    <p className="username">{blog.username}</p>
                    <p className="topic">{blog.topic}</p>
                  </div>
                </div>
                <div className="post">
                  <div className="content">
                    <p className="date">{blog.date}</p>
                    <p className="title">{blog.title}</p>
                    <p className="info">{blog.info}</p>
                    <div className="interaction">
                      <div className="like" onClick={() => handleLikeClick(blog.id)}>
                        <img
                          src={isLiked ? assets.likefill_icon : assets.like_icon}
                          alt="like"
                        />
                        {blog.link}k
                      </div>
                      <div className="comment">
                        <img src={assets.comment_icon} alt="comment" />
                        {blog.comment}
                      </div>
                      <div className="share">
                        <img src={assets.share_icon} alt="share" />
                        {blog.share}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mob-btn">
                    <a className="nav-btn" href={blog.link}>
                      View Blog
                      <img className="up_arror_img" src={assets[blog.arrowImg]} alt="arrow" />
                    </a>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogsP;