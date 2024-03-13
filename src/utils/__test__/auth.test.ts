import { describe, it, expect, beforeEach } from 'vitest'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from '../auth'

const access_token = ''

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token is in local storage', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('clearLS', () => {
  it('remove access_token', () => {
    setAccessTokenToLS(access_token)
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
  })
})
