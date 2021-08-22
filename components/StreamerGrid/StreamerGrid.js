import React, { useEffect } from 'react'
import styles from '../../styles/StreamerGrid.module.css'
import Image from 'next/image'

const StreamerGrid = ({ channels, setChannels }) => {

  const removeChannelAction = channelId => async () => {
    // console.log("Removing channel...")
    // setChannels(channels.filter(channel => channel.id != channelId))

    console.log('Removing channel with ID: ', channelId)

    const filteredChannels = channels.filter(channel => channel.id != channelId)
    setChannels(filteredChannels)
    const joinedChannels = filteredChannels.map(channel => channel.display_name.toLowerCase()).join(",")

    await setDBChannels(joinedChannels)
  }

const setDBChannels = async channels => {
  try {
    const path = `https://${window.location.hostname}`

    const response = await fetch(`${path}/api/database`, {
      method: 'POST',
      body: JSON.stringify({
        key: 'CHANNELS',
        value: channels
      })
    })

    if (response.status === 200) {
      console.log(`Set ${channels} in DB.`)
    }
  } catch (error) {
    console.warn(error.message)
  }
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