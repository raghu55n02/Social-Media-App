import "./topbar.css";
import { Search,Chat} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const history = useHistory();
   const handleSubmit =()=>{
       localStorage.clear();
       history.push("/login");
      window.location.reload(true);
   }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Homepage</span>
        </Link>
      </div>
      <div className="topbarIcons">
          <Link to={"/messenger"}>
            <div className="topbarIconItem">
               <Chat />
            </div>
          </Link> 
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <button className="topbarLink" onClick={handleSubmit} >logout</button>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/8.jpeg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
