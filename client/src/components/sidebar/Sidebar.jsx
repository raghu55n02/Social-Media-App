import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [users, setUsers] = useState([]);
   const { user } = useContext(AuthContext);
    useEffect(() => {
    const getUsers = async () => {
      try {
        const user1 = await axios.get("/users/all/users");
        setUsers(user1.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
       <h4 className="findfriends">Find Friends</h4>  
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <Link
              to={"/profile/" + u.username}
              style={{ textDecoration: "none" }} >
              <div>
                 {user.username!==u.username && <CloseFriend key={u.id} user={u} />}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
