import * as React from "react";
import ConversationItem from "./ConversationItem";

export interface ISidebarPageProps {}

export default function SidebarPage() {
    const [conversations, setConversations] = React.useState([
        {
            name: "Test#1",
            lastMessage: "Last Message #1",
            timeStamp: "today",
        },
        {
            name: "Test#2",
            lastMessage: "Last Message #2",
            timeStamp: "today",
        },
        {
            name: "Test#3",
            lastMessage: "Last Message #3",
            timeStamp: "today",
        },
        {
            name: "Test#4",
            lastMessage: "Last Message #4",
            timeStamp: "today",
        },
        {
            name: "Test#5",
            lastMessage: "Last Message #5",
            timeStamp: "today",
        },
        {
            name: "Test#6",
            lastMessage: "Last Message #6",
            timeStamp: "today",
        },
    ])
  return (
    <div>
      <div>
        <input placeholder="Find or start a conversation" />
      </div>
  
      <div>Friend</div>

      <div>
        DIRECT MESSAGE
        <button>+</button>
        <div className="sb-conversation">
            {conversations.map((conversation)=>{
                return <ConversationItem  {...conversation}/>
            })}
        </div>
      </div>
    </div>
  );
}
