import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import axios from "axios";
// import ChatNameAvatar from "./ChatNameAvatar/ChatNameAvatar";

import "./ChatName.css";

const ENDPOINT = `${import.meta.env.VITE_PUBLIC_SERVER_URL}/`;
var socket, selectedChatCompare;
const ChatName = () => {
  const [loggedUser, setLoggedUser] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    // console.log(user);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/v1/chat`,
        config
      );
      // console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);
  return (
    <div>
      {/* {chats && chats.map((chat) => <div className="myChats">{chat.name}</div>)} */}
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            className="myChats"
            key={chat._id}
            onClick={() => {
              setSelectedChat(chat);
              // console.log(chat._id);
            }}
            style={{
              cursor: "pointer",
              background: `${selectedChat === chat ? "#E8E8E8" : "#fff"}`,
              color: `${selectedChat === chat ? "black" : "black"}`,
            }}
          >
            <p className="text">
              <div className="profile-pic-2">
                {chat.users[0] ? (
                  chat.users[0].name === user.data.user.name ? (
                    <img
                      src={chat.users[1].photo ? chat.users[1].photo : ""}
                      alt="sender-image"
                    />
                  ) : (
                    <img
                      src={chat.users[0].photo ? chat.users[0].photo : ""}
                      alt="sender-image"
                    />
                  )
                ) : (
                  ""
                )}
              </div>
              {chat.users[0]
                ? chat.users[0].name === user.data.user.name
                  ? chat.users[1].name
                  : chat.users[0].name
                : ""}
            </p>
          </div>
        ))
      ) : (
        <div
          style={{
            marginTop: "50px",
            marginLeft: "50px",
            color: "black",
            backgroundColor: "white",
          }}
        >
          No chats
        </div>
      )}
    </div>
  );
};

export default ChatName;
