import React from "react";
import { useParams } from "react-router-dom";

const UserData = {
  지존진교: {
    id: "user1",
    email: "oygnijoes0209@email.com",
    nickname: "지존진교",
    password: "one234",
    school: "대구소프트웨어마이스터고등학교",
    birth: 20081201,
    grade: 1,
  },
  cugar: {
    id: "user2",
    email: "cugar@gmail.com",
    nickname: "cugar",
    school: "대구소프트웨어마이스터고등학교",
    birth: 20081204,
    grade: 1,
  },
};

const UserList = ({ match }) => {
  const { username } = useParams();
  const profile = UserData[username];
};

export default UserData;
