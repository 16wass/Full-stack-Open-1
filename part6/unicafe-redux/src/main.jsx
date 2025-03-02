import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = ()=>{
    store.dispatch({
      type:'OK'
    })
  }
  const bad =() =>{
    type: 'BAD'
  }
  const resetStats = () =>{
    type: 'ZERO'
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button>ok</button> 
      <button>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok</div>
      <div>bad</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
