import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios"; // import axios
import "./home.css";

export default function Home() {
  const [posts, setPosts] = useState([]); // initial state is going to be an empty arr. cuz we haven't fetched any data yet
  const { search } = useLocation();

  useEffect(
    () => {
      // fetch posts
      const fetchPosts = async () => {
        const res = await axios.get("/posts" + search);
        setPosts(res.data); // set posts
        // "proxy": "http://localhost:5000/api/" if you write api URL in package.json you can use proxy for axios library
      };
      fetchPosts();
    },
    [search] //
  );

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} /> {/* pass this as posts */}
        <Sidebar />
      </div>
    </>
  );
}
