import React from "react";
import { useParams } from "react-router-dom";

const UserData = {
  지존진교: {
    name: "지존진교",
  },
  cugar: {
    name: "cugar",
  },
};

const UserList = ({ match }) => {
  const { userName } = useParams();
  const profile = profileData[userName];

//   if (!profile) {
//     return
//   }
};
