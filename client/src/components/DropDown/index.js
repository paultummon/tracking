import React, { useState, useRef, useEffect } from 'react'
import styles from './Dropdown.module.css'
import classnames from 'classnames'

const CheckFocus = (e, inputRef, toggleView) => {
  toggleView(inputRef.current.contains(e.target))
}

export default (props) => {
  const { listItems, filter, renderListItems } = props
  const [list, useList] = useState(listItems)
  const [toggle, useToggle] = useState(false)
  const inputRef = useRef()
  useEffect(() => {
    document.addEventListener('mouseup', (e) => CheckFocus(e, inputRef, useToggle))
    return () => {
      document.removeEventListener('mouseup', (e) => CheckFocus(e, inputRef, useToggle))
    }
  })
  const dropDownContentClass = classnames(styles.dropdownContent, toggle ? styles.show : '')
  return (
    <div className={styles.dropdown}>
      <input ref={inputRef} onChange={(e) => filter(e.target.value, listItems, useList)} className={styles.searchInpt} type='text' placeholder='Search..' />
      <div className={dropDownContentClass}>
        {renderListItems(list)}
      </div>
    </div>
  )
}
