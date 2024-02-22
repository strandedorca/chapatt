import React, { useState } from "react";
import ConversationItem from "./ConversationItem";
import styles from "./SideBar.module.css";
import { FaDiscord } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";


interface IConversation {
  id: number;
  icon: string;
  name: string;
  button: string;
}

const SidebarPage: React.FC = () => {
  const [conversations, setConversations] = useState<IConversation[]>([
    { id: 1, icon: "Icon1", name: "Test#1", button: "X" },
    { id: 2, icon: "Icon2", name: "Test#2", button: "X" },
    { id: 3, icon: "Icon3", name: "Test#3", button: "X" },
    { id: 4, icon: "Icon4", name: "Test#4", button: "X" },
    { id: 5, icon: "Icon5", name: "Test#5", button: "X" },
    { id: 6, icon: "Icon6", name: "Test#6", button: "X" },
  ]);

  return (
    <div className={styles.sidebarMain}>
      <div className={styles.sidebarInput}>
        <input placeholder="Find or start a conversation" />
      </div>

      <div className={styles.sidebarFriends}>
        <svg
          className="linkButtonIcon__2f35b"
          aria-hidden="true"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            className=""
          ></path>
          <path
            fill="currentColor"
            d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 
        12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 
        2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z"
            className=""
          ></path>
        </svg>
        Friends
      </div>

      <div className={styles.sidebarShop}>
        <svg
          className="linkButtonIcon__2f35b"
          aria-hidden="true"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2.63 4.19A3 3 0 0 1 5.53 2H7a1 1 0 0 1 1 1v3.98a3.07 3.07 0 0 1-.3 1.35A2.97 2.97 0 0 1 4.98 10c-2 0-3.44-1.9-2.9-3.83l.55-1.98ZM10 2a1 1 0 0 0-1 1v4a3 3 0 0 0 3 3 3 3 0 0 0 3-2.97V3a1 1 0 0 0-1-1h-4ZM17 2a1 1 0 0 0-1 1v3.98a3.65 3.65 0 0 0 0 .05A2.95 2.95 0 0 0 19.02 10c2 0 3.44-1.9 2.9-3.83l-.55-1.98A3 3 0 0 0 18.47 2H17Z"
            className=""
          ></path>
          <path
            fill="currentColor"
            d="M21 11.42V19a3 3 0 0 1-3 3h-2.75a.25.25 0 0 1-.25-.25V16a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v5.75c0 .14-.11.25-.25.25H6a3 3 0 0 1-3-3v-7.58c0-.18.2-.3.37-.24a4.46 4.46 0 0 0 4.94-1.1c.1-.12.3-.12.4 0a4.49 4.49 0 0 
      0 6.58 0c.1-.12.3-.12.4 0a4.45 4.45 0 0 0 4.94 1.1c.17-.07.37.06.37.24Z"
            className=""
          ></path>
        </svg>
        Shop
      </div>

      <div className={styles.directMessages}>
        DIRECT MESSAGES
        <div className={styles.add}>
         +
        </div>
      </div>

      <div>
        {conversations.map((item) => (
          <ConversationItem key={item.id} icon={item.icon} name={item.name} button={item.button}/>
        ))}
      </div>

      <div className={styles.sidebarFooter}>
      <FaDiscord className={styles.discordIcon}/>
        Account name

      <div className={styles.iomicrophone}>
        <FaMicrophone className={styles.microphone}/>
      </div>
      <div className={styles.ioheadphone}>
        <FaHeadphones className={styles.headphones}/>
      </div>
      <div className={styles.iosetting}>
        <IoIosSettings className={styles.settingIcon} />
      </div>
      </div>
    </div>
  );
};

export default SidebarPage;
