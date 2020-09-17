import React from 'react'
import styles from './Marquee.module.css'

const renderBannerContent = (bannerContent) => {
  return bannerContent.map((contentItem, index) => {
    return <span key={`contentItem-${index}`}><span className={styles.notificationContainer}>{contentItem}</span>{contentItem}</span>
  })
}

export default (props) => {
  const { bannerContent } = props
  return (
    <marquee className={styles.marquee}>
      {renderBannerContent(bannerContent)}
    </marquee>
  )
}
