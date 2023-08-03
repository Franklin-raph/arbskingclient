import React from 'react'

const Telegram = ({setIsTelegramModalOpen}) => {
  return (
    <div className='telegramModalBg'>
        <div className='telegramModal'>
            <i className="fa-solid fa-circle-xmark" onClick={()=> setIsTelegramModalOpen(false)}></i>
            <p>Click on the button below to join our telegram channel</p>
            <a href="https://t.me/+HDIJPV9EB4w5Y2E8">
                <p>telegram</p>
                <i className="fa-brands fa-telegram"></i>
            </a>
        </div>
    </div>
  )
}

export default Telegram