import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">CI/CD & Cloud</span>
        <span className="headerTitleLg">DevOps Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg"
        alt="DevOps Cloud"
      />
    </div>
  );
}
 