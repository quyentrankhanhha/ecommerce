import { waitFor, screen } from '@testing-library/react'
import path from 'src/constants/path'
import { access_token_10s } from 'src/msw/auth.msw'
import { setAccessTokenToLS } from 'src/utils/auth'
import { renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'

describe('Profile', () => {
  it('Display Profile page', async () => {
    setAccessTokenToLS(access_token_10s)
    const { container } = renderWithRouter({ route: path.profile })
    await waitFor(() => {
      expect(screen.queryByText('My Profile')).toBeInTheDocument()
      expect((container.querySelector('form input[placeholder="Name"]') as HTMLInputElement).value).toBe('')
    })
  })
})
