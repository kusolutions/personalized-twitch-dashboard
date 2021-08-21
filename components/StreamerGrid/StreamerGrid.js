import React, { useEffect } from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({ channels, setChannels }) => {

  const removeChannelAction = channelId => () => {
    console.log("Removing channel...")
    setChannels(channels.filter(channel => channel.id != channelId))
  }

  const renderGridItem = channel => (
    <div key={channel.id} className={styles.gridItem}>
      <button onClick={removeChannelAction(channel.id)}>X</button>
      <Image layout="fill" src={channel.thumbnail_url} />
      <div className={styles.gridItemContent}>
        <p>{channel.display_name}</p>
        <p>{channel.is_live && <p>🔴 Live</p>}</p>
        <p>{!channel.is_live && <p>⚫️ Offline</p>}</p>
      </div>
    </div>
  )

  useEffect(() => {
    console.log('CHANNELS: ', channels)
  }, [channels])

  const renderNoItems = () => (
    <div className={styles.gridNoItems}>
      <img className={styles.imgInit} src="/4722215.jpeg"/>
    </div>
  )
  return (
    <div className={styles.container}>
      <h2>Kushagra's Twitch Dashboard 🥳</h2>
      <div className={styles.gridContainer}>
        {channels.length > 0 && channels.map(renderGridItem)}
        {channels.length === 0 && renderNoItems()}
      </div>
    </div>
  )
}

export default StreamerGrid