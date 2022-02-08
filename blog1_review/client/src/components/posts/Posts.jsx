import Post from "../post/Post";
import "./posts.css";

export default function Posts(
  { posts } // prop from Home.jsx
) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
      {/*pass this post to Post.jsx by using prop
      use map functions to fetch each post */}
    </div>
  );
}
