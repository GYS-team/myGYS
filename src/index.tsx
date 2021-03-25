import ReactDOM from 'react-dom'
import Pages from './pages/page'
import User from './model/user'
import React, { useEffect } from 'react'
const App: React.FC = () => {
    return (
      <User.Provider>
        <Pages/>
      </User.Provider>
    )
  }
ReactDOM.render(<App />, document.querySelector('#root'))