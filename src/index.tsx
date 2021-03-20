import ReactDOM from 'react-dom'
import SignIn from './signin'
import Pages from './AppBar'
import User from './model/user'
import React, { useEffect } from 'react'
const App: React.FC = () => {
    return (
      <User.Provider>
        <SignIn/>
      </User.Provider>
    )
  }
ReactDOM.render(<App />, document.querySelector('#root'))