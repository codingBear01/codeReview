import { Link } from "react-router-dom";
import "./post.css";

export default function post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
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
          <span className="postTitle">{post.title}</span>
        </Link>

        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
