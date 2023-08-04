import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import "./SearchUser.css";
import AuthService from "../../../services/auth.service";

const SearchUser = () => {
  const [input, setInput] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [focus, setFocus] = useState("none");

  const handlerClose = () => {
    setFocus("none");
  };

  const fetchUserData = (val) => {
    console.log(input);
    if (val) {
      AuthService.getUsers(val)
        .then((res) => {
          setUsers(res.data.data);
          console.log(users);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(123);
      setUsers([]);
    }
  };

  const handleChange = (val) => {
    setFocus("block");
    if (val.length > 0) {
      setInput(val);
      fetchUserData(val);
    } else {
      setInput(undefined);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="search-input-wrapper">
        <SearchIcon className="search-input-icons" />
        <input
          className="user-search-input"
          type="text"
          placeholder="Nhập tên người dùng muốn tìm kiếm"
          value={input}
          onInput={(e) => handleChange(e.target.value)}
        />
        <PersonSearchOutlinedIcon className="search-input-icons" />
      </div>
      <button
        className="close-search-btn"
        style={{
          display: focus,
        }}
        onClick={() => {
          handlerClose();
        }}
      >
        X
      </button>
      <div
        className="found-users-dpl"
        id="user-search-result"
        tabIndex={0}
        autoFocus={true}
        style={{ display: focus }}
        onBlur={() => {
          handlerClose();
        }}
      >
        {users.length > 0 ? users.map((item) => <p>{item.userName}</p>) : null}
      </div>
    </div>
  );
};

export default SearchUser;
