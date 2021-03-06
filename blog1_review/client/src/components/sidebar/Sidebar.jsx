import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]); // initial state is going to be an empty arr. cuz we haven't fetched any data yet

  useEffect(
    () => {
      const getCats = async () => {
        const res = await axios.get("/categories"); // call categories
        setCats(res.data);
      };
      getCats();
    },
    [] // fire this at the beginning
  );

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://item.kakaocdn.net/do/c1f776f003575a391f19f13ccac145a682f3bd8c9735553d03f6f982e10ebe70"
          alt=""
        />
        <p>
          Hello! My name is Kang Myeongmo. I lived in Busan, South Korea. Nice
          to meet you!
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem" key="key_sidebar">
                {c.name}
              </li>
            </Link>
          ))}
          {/*cats is array so we can use array function.
          if click this link go to clicked categories' post page */}
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
