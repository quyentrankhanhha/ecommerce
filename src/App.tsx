import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const routeElements = useRouteElements()
  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
