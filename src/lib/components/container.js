import React from 'react'

const styles = {
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '800px',
  }
}

const Container = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  )
}

export default Container
