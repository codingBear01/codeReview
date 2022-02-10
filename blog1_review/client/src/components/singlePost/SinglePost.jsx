import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation(); // fetch data according to /id
  const path = location.pathname.split("/")[2]; // take pathname from useLocation function and split this to use just id(after /post/)
  const [post, setPost] = useState({}); // initial state is going to be an empty obj. cuz we haven't fetched any data yet
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(
    () => {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        //fetch post on /posts/user_id
        //fetch data
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      };
      getPost();
    }, //imperative function that can return a cleanup function
    [path] //If present, effect will only activate if the values in the list change.
  );

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username }, //you can send data directly cuz you use delete method
      });
      window.location.replace("/"); // if delete this page, redirect to main page
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && ( //if post.username match with user?.username you can see buttons
              <div className="singlePostEdit">
                <i
                  className="singPostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singPostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
            {/* if click this link go to user's post page */}
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        {/*only in updateMode you can see update btn */}
      </div>
    </div>
  );
}
