import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  );
  //console.log('usser',user)
  //console.log("followed",followed)
  const [count,setCount]=useState(0);
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user._id))
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

    useEffect(() => {
    let user1=null;
    const getConversations = async () => {
      //console.log("step1")
      try {
        if(user!==undefined && user.username !== currentUser.username)
        {
           //console.log("step2")
           user1 = await axios.get(`/conversations/find/${user._id}/${currentUser._id}`);
           //console.log("smthg",user1,user)
           if(user1.data===null && user.username !== currentUser.username)
           {
              //console.log("step3")
              //console.log("smthg",user1,user)
              //console.log(user._id," hdjkj ",currentUser._id)
              if(user._id!==undefined)
              {
                   //console.log('you are here')
                   await axios.post("/conversations",{senderId:currentUser._id,receiverId:user._id});
              }
           }
        }
        
      } catch (err) {
        //await axios.post("/conversations",{senderId:currentUser._id,receiverId:user._id});
        //console.log(err);
      }
    };
    getConversations();
  }, [count]);

  const handleClick = async () => {
    setCount(count+1);
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/8.jpeg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
