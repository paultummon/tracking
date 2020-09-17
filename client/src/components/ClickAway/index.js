import React, { useEffect, useRef } from 'react'

export default ({ children, handleComponentFocus }) => {
  const node = useRef(null)

  const handleFocus = (e) => {
    handleComponentFocus(node.current.contains(e.target))
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleFocus)
    return () => {
      document.removeEventListener('mousedown', handleFocus)
    }
  }, [])

  return (
    <div ref={node}>{children}</div>
  )
}
