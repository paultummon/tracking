import React from 'react'
import css from './Loader.module.css'

const loadingComponent = () => {
  return (
    <div className={css.loadingContainer}>
      <div className={css.loader}>
        <span>Loading</span>
      </div>
      <h1>Loading...</h1>
    </div>
  )
}

export default ({ loading, children }) => {
  return (
    <div>
      {!loading ? children : loadingComponent()}
    </div>
  )
}
