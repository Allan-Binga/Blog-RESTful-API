import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          alt="DevOps Engineer"
        />
        <p>
          Hi! I'm a DevOps Engineer passionate about CI/CD, cloud computing (AWS & GCP), and automation. I share insights on deploying, scaling, and securing applications.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=CI/CD">CI/CD</Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=AWS">AWS</Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=GCP">GCP</Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=Testing">Testing</Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="/posts?cat=DevOps">DevOps</Link>
          </li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW ME</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-linkedin"></i>
          <i className="sidebarIcon fab fa-twitter"></i>
          <i className="sidebarIcon fab fa-github"></i>
        </div>
      </div>
    </div>
  );
}
