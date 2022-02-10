import { Link } from "react-router-dom"; // need to import for using Link
import "./post.css";

export default function post(
  { post } // prop from Posts.jsx
) {
  const PF = "http://localhost:5000/images/"; //set img uploading URL
  return (
    <div className="post">
      {/*post.<something> is values coming from saved data in mongoDB by Post.js & posts.js
      back(Post.js → posts.js → mongoDB) → front(Post.jsx)
      */}
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

      <div className="postInfo">
        <div className="PostCats">
          {post.categories.map((c) => (
            <span className="postCat" key="key_postCat">
              {c.name}
            </span>
          ))}
        </div>

        <Link className="link" to={`/post/${post._id}`}>
          {/*if click postTitle you transfer to /post/${post._id} URL */}
          <span className="postTitle">
            {post.title}
            {/*take title from post */}
          </span>
        </Link>

        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
          {/*take date from post */}
        </span>
      </div>

      <p className="postDesc">
        {post.desc}
        {/*take desc from post */}
      </p>
    </div>
  );
}
