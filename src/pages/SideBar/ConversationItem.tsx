import * as React from 'react';
import styles from './SideBar.module.css'

export interface IConversationItemProps {
}

export default function ConversationItem ({props}) {
  return (
    <div className={styles.container}>
      <p className={styles.icon}>{props.name[0]}</p>
      <p className={styles.title}>{props.name}</p>
      <p className={styles.lastMessage}>{props.lastMessage}</p>
      <p className={styles.timeStamp}>{props.timeStamp}</p>
    </div>
  );
}
