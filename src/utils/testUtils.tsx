import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'

export const renderWithRouter = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}
