import { React, useEffect, useState, useRef } from 'react';
import {v4 as uuidv4} from 'uuid';
import { randomColor } from 'randomcolor';
import  Draggable  from 'react-draggable';
import './App.css';


function App() {
  const [item, setItem] = useState(' ')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
  const draggableRef = useRef(null);
  
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items)) 
  },[items])
  
  const updatePos = (data, index) => {
        let newArr = [...items];
        newArr[index].defaultPost = {x: data.x, y: data.y}
        setItems(newArr)
  }

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPost: {
          x: 600,
          y: -550,
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    }else{
      alert("Enter something....")
      setItem('')
    }
  }
  const onKeyPress = (e) => {
    const code = e.keyCode || e.which

    if (code === 13) {
        newItem()
    }
  }

  const remove = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="App">
      <div className='wrapper'>
            <input 
            value={item}
            type='text' 
            name='text'  
            placeholder='Enter something ?'
            onChange={(e) => setItem(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
            />
            <button className='button' onClick={newItem}>ENTER</button>
      </div>
      {
        items.map((item, index) => {
          return (
              <Draggable 
              nodeRef={draggableRef}
                  key={index} 
                  defaultPosition={item.defaultPost}
                  onStop={(_, data) => {
                  updatePos(data, index)
                  }}
                  >
                <div ref={draggableRef} className='todo__item' style={{ background: `${item.color}` }}>
                    { `${item.item} `}
                    <button className='remove' onClick={() => remove(item.id)}>X</button>
                </div>
              </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
