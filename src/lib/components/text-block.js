import React, { useState, useRef } from 'react'

const styles = {
  root: {
    margin: '10px 0',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center'
  },
  editor: {
    flex: 1,
    padding: 3,

    cursor: 'text',
  }
}

const TextBlock = ({ initBlockData, ...other }) => {
  const [blockData, setBlockData] = useState({...initBlockData})
  const [textVal, setTextVal] = useState('')
  const [editorPlaceholder, setEditorPlaceholder] = useState('Skriv ett bra råd!')
  const _onChange = e => {
    const { value } = e.target
    setTextVal(value)
  }

  const _onFocus = () => setEditorPlaceholder('')
  const _onBlur = () => setEditorPlaceholder('' === textVal ? 'Skriv ett bra råd!' : '')
  const _onKeyUp = () => setBlockData({...blockData, selected: true})
  const _onChangeSelect = e => setBlockData({...blockData,
    selected: e.target.checked,
  })

  const editor = useRef(null);

  console.log(initBlockData)

  return (
    <div style={styles.root}>
      {blockData.selectable && (
        <input
          type='checkbox'
          checked={blockData.selected}
          onChange={_onChangeSelect}
        />
      )}
      <blockData.component
        id={blockData.uid}
        {...other}
        className='editable'
        style={styles.editor}
        ref={editor}
        contentEditable
        onKeyUp={_onKeyUp}
        onChange={_onChange}
        onFocus={_onFocus}
        onBlur={_onBlur}
        data-placeholder={editorPlaceholder}
      />
    </div>
  )
}

export default TextBlock
