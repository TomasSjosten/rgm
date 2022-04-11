import React, { useState } from 'react'
import { uid } from '../services/uid'

const styles = {
  root: {
    margin: '10px 0',
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  editor: {
    flex: 1,
    padding: 3,

    cursor: 'text',
  }
}

const TextBlock = ({ initBlockData, ...other }) => {
  const [blockData, setBlockData] = useState({...initBlockData})

  const _onFocus = e => {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(e.target)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const _onChangeSelect = e => {
    const { checked, name } = e.target
    setBlockData({...blockData,
      checkboxes: blockData.checkboxes.map(checkbox => {
        if (name !== checkbox.uid) {
          return checkbox
        }

        return {...checkbox, checked: checked}
      }),
    })
  }

  const _addOption = () => {
    setBlockData({...blockData, checkboxes: [
        ...blockData.checkboxes,
        {uid: uid(), checked: false, label: `Val ${blockData.checkboxes.length + 1}`}
    ]})
  }

  console.log(initBlockData)

  return (
    <div style={styles.root}>
      <div
        contentEditable
        style={styles.editor}
        className='editable'
        data-placeholder='Skriv någonting bra'
      />
      {blockData.checkboxes.map(checkbox => (
        <div style={styles.checkboxWrapper}>
          <input
            onChange={_onChangeSelect}
            name={checkbox.uid}
            type='checkbox'
            checked={checkbox.checked}
          />
          <div contentEditable onFocus={_onFocus}>{checkbox.label}</div>
        </div>
      ))}
      <div>
        <button onClick={_addOption}>
          Lägg till alternativ
        </button>
      </div>
    </div>
  )
}

export default TextBlock
