import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GiftIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import './Chat.css'
import Message from './Message'
const Chat = () => {
    const [input, setInput] = useState('')
  return (
    <div className='chat'>
        <ChatHeader />
        <div className='chat__messages'>
            <Message />
            <Message />
            <Message />
        </div>
        <div className='chat__input'>
            <AddCircleIcon fontSize='large' />
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #TESTCHANNEL`} />
                <button className='chat__inputButton' type='submit'>Send Message</button>
            </form>
            <div className='chat__inputIcons'>
                <CardGiftcardIcon fontSize='large' />
                <GiftIcon fontSize='large' />
                <EmojiEmotionsIcon fontSize='large' />
            </div>
        </div>
    </div>
  )
}

export default Chat