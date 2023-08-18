// import React from 'react'
import { useParams } from "react-router";
import UpdateService from "../services/user.sevice";
import React, { useEffect, useState } from "react";

const InviteWs = () => {
  const [userReceive, setUserReceive] = useState(null);
  // const [checkUser, setCheckUser] = useState();
  const idUserReceive = useParams().idUser;
  const userCurrent = JSON.parse(localStorage.getItem("user"));

  async function fetchUser(id) {
    try {
      console.log(idUserReceive);

      const response = await UpdateService.getUserDetail(id);
      console.log(1);
      setUserReceive(response);
      setCheckUser(userReceive.data.user._id == userCurrent._id);
      console.log(checkUser);
      console.log(userReceive);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  async function fetchCheckUser() {
    try {
      console.log(2);
      setCheckUser(userReceive.data.user._id == userCurrent._id);
      console.log(checkUser);
      console.log(userReceive);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function handleAction(action) {
    console.log(action);
  }

  useEffect( async () => {
    fetchUser(idUserReceive);
 
  }, [idUserReceive]);

  useEffect(() => {
    fetchCheckUser();
  }, [userReceive]);

  return (
    <div>
      Alo current user {userCurrent._id}
       {/* {userReceive.data.user._id} */}
      {!checkUser ? (
        <p> Bạn cần đăng nhập vào {userReceive.data.user.userName} </p>
      ) : (
        <>
          <p>Bạn có đồng ý tham gia vào Work Space </p>
          <button onClick={() => handleAction("approve")}>Đồng ý</button>
          <button onClick={() => handleAction("reject")}>Từ chối</button>
        </>
      )}
    </div>
  );
};

export default InviteWs;
