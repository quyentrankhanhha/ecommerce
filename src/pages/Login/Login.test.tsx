import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  beforeAll(async () => {
    renderWithRouter({ route: path.login })

    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })

  it('should show required message when input is empty', async () => {
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Please enter your email')).toBeTruthy()
      expect(screen.queryByText('Please enter your password')).toBeTruthy()
    })
  })

  it('should show error message when email and password are invalid', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'testemail'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.submit(submitButton)

    await waitFor(async () => {
      expect(await screen.findByText('Please enter a valid email')).toBeTruthy()
      expect(await screen.findByText('Minimum 5 characters')).toBeTruthy()
    })
  })

  it('should disappear error message when re-typing valid email and password', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'haahaa@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })

    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email')).toBeFalsy()
      expect(screen.queryByText('Minimum 5 characters')).toBeFalsy()
    })

    fireEvent.submit(submitButton)
    // await waitFor(() => {
    //   expect(document.querySelector('title')?.textContent).toBe('Ecommerce project')
    // })
  })
})
