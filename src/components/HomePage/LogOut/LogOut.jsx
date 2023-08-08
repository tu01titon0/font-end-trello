import React from "react";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router";

const LogOut = () => {
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  return <button onClick={() => handleSignOut()}>Log out</button>;
};

export default LogOut;
