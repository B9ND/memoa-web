import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Post from "../../components/Post/post";
import Pro from "../../components/Pro/Pro";

const Profile = () => {
  return (
    <div className="head-main">
      <Header />
      <Pro />
      <Post />
    </div>
  );
};

export default Profile;
