import React from 'react';
import styles from './SideBar.module.css'
import { CiUser } from "react-icons/ci";

interface IConversationItemProps {
  name: string;
  button: string;
  icon: string;
}

const ConversationItem: React.FC<IConversationItemProps> = ({icon, name, button }) => {
  return (
    <div className={styles.container}>
      <p>{<CiUser className={styles.userIcon}/>}</p>
      <p>{name}</p>
      <p className={styles.buttonX}>{button}</p>
    </div>
  );
};

export default ConversationItem;
