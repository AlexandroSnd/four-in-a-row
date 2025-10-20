import { Route, Routes } from 'react-router-dom'
import './App.css'
import { GamePage } from './pages/GamePage'
import { StartPage } from './pages/StartPage'
import { AppRoutes } from './types/app'

function App() {
  

  return (
    <>
      <Routes>
        <Route path={AppRoutes.Game} element={<GamePage />} />
        <Route path={AppRoutes.Home} element={<StartPage />} />
      </Routes>
    </>
  )
}

export default App
