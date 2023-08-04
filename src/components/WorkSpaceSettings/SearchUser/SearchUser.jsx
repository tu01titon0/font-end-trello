import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import "./SearchUser.css";
import AuthService from "../../../services/auth.service";

const SearchUser = () => {
  const [input, setInput] = useState(undefined);
  const [users, setUsers] = useState([]);

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
    if (val.length > 0) {
      setInput(val);
      fetchUserData(val);
    } else {
      setInput(undefined);
    }
  };

  return (
    <div>
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
      <div>
        {users.length > 0 ? users.map((item) => <p>{item.userName}</p>) : null}
      </div>
    </div>
  );
};

export default SearchUser;
