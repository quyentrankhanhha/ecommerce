import { describe, expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { renderWithRouter } from './utils/testUtils'
import path from './constants/path'

describe('App', () => {
  test('should render App', async () => {
    const { user } = renderWithRouter()

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

  test('should render Not Found Page', async () => {
    const badRoute = '/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Not Found')
    })
    //screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('should render Register Page', async () => {
    renderWithRouter({ route: path.register })
    await waitFor(() => {
      expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument()
    })
  })
})
