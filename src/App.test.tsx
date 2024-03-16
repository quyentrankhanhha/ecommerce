import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  test('App render', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const user = userEvent.setup()

    // await waitFor(() => {
    //   expect(document.querySelector('title')?.textContent).toBe('Ecommerce project')
    // })

    await user.click(screen.getByText(/Login/i))
    await waitFor(() => {
      expect(screen.queryByText('Do not have an account?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Login')
    })
    //screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
