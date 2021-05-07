import { Link } from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog, updateBlog } from "../../actions/blog";
import moment from "moment";
// **************************************************************** //

const ReadBlogs = () => {
  const [blogs, setBlog] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlog(data);
      }
    });
  };

  const deleteBlog = (slug) =>{
    removeBlog(slug, token).then(data =>{
        if(data.error){
            console.log(data.error);
        } else {
            setMessage(data.message)
            loadBlogs()
        }
    })
  }

  const deleteConfirm = slug =>{
      let answer = window.confirm('Are you sure you want to delete your blog?')
      if(answer){
          deleteBlog(slug)
      }
  }

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="pb-5">
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name} | Published{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            className="btn btn-small btn-danger"
            onClick={()=>deleteConfirm(blog.slug)}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
              {message && <div className="alert alert-warning">{message}</div>}
              {showAllBlogs()}
              </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadBlogs;
