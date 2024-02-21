import * as React from 'react';
import styles from './SideBar.module.css'

export interface IConversationItemProps {
  name: string;
  lastMessage: string;
  timeStamp: string;
}

export default function ConversationItem (props: IConversationItemProps) {
  return (
    <div className={styles.container}>
      <p className={styles.icon}>{props.name[0]}</p>
      <p className={styles.title}>{props.name}</p>
      <p className={styles.lastMessage}>{props.lastMessage}</p>
      <p className={styles.timeStamp}>{props.timeStamp}</p>
    </div>
  );
}
