import React from 'react';
import styles from './SideBar.module.css'
import { CiUser } from "react-icons/ci";

interface IConversationItemProps {
  name: string;
  icon: string;
}

const ConversationItem: React.FC<IConversationItemProps> = ({name }) => {
  return (
    <div className={styles.container}>
      <p>{<CiUser className={styles.userIcon}/>}</p>
      <p>{name}</p>
    </div>
  );
};

export default ConversationItem;
