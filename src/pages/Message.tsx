import React from 'react'
import './Message.css'
import { Avatar } from '@material-ui/core'
const Message = () => {
  return (
    <div className='message'>
        <Avatar />
        <div className='message__info'>
            <h4>
                <span className='message__timestamp'>This is timestamp</span>
            </h4>
            <p>This is message</p>
        </div>
    </div>
  )
}

export default Message