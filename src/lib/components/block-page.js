import React, { useState } from 'react'
import { uid } from '../services/uid'
import TextBlock from './text-block'
import CheckboxBlock from './checkbox-block'

const BLOCK_TYPE = {
  text: 1,
  checkbox: 2,
}

const getBlockInfo = () => ({
  type: BLOCK_TYPE.text,
  uid: uid(),
  value: '',
  selected: false,
  selectable: true,
  component: 'p'
})

const BlockPage = (props) => {
  const [blocks, setBlocks] = useState([])
  const _addBlock = blockData => setBlocks([...blocks, {...blockData}])

  return (
    <div>
      {blocks.map(blockData => {
        switch (blockData.type) {
          case BLOCK_TYPE.checkbox:
            return (
              <CheckboxBlock
                key={blockData.uid}
                initBlockData={blockData}
              />
            )
          default:
            return (
              <TextBlock
                key={blockData.uid}
                initBlockData={blockData}
              />
            )
        }
      })}
      <AddBlock addBlock={_addBlock} />
    </div>
  )
}

export default BlockPage


const AddBlock = ({ addBlock }) => {
  const _addTextBlock = () => addBlock({
    ...getBlockInfo(),
    component: 'p',
    selectable: true,
  })
  const _addHeader1Block = () => addBlock({...getBlockInfo(),
    component: 'h1',
    selectable: false,
  })
  const _addHeader2Block = () => addBlock({...getBlockInfo(),
    component: 'h2',
    selectable: false,
  })
  const _addCheckboxBlock = () => addBlock({...getBlockInfo(),
    type: BLOCK_TYPE.checkbox,
    component: 'form',
    selectable: false,
    checkboxes: [
      {uid: uid(), checked: false, label: 'Val 1'}
    ]
  })

  return (
    <div style={{ background: '#b6b6b6', padding: '10px 5px', marginTop: '40px', boxShadow: 'rgb(154 151 151) 0px -2px 12px 0px' }}>
      <button onClick={_addTextBlock}>
        Lägg till text
      </button>
      <button onClick={_addHeader1Block}>
        Lägg till header 1
      </button>
      <button onClick={_addHeader2Block}>
        Lägg till header 2
      </button>
      <button onClick={_addCheckboxBlock}>
        Lägg till checkbox
      </button>
    </div>
  )
}
