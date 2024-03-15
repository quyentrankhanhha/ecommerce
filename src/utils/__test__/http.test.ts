import { describe, it, expect, beforeEach } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    http = new Http().instance
    localStorage.clear()
  })

  const access_token_10s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjQ4MmQ4YjExNDAwODkzZGY3M2YxMyIsImVtYWlsIjoiaGFhaGFhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTVUMTA6MDc6MzYuMzI3WiIsImlhdCI6MTcxMDQ5NzI1NiwiZXhwIjoxNzEwNDk3NjE2fQ.EiCY0qezKPlb5GOgXjIw_W34pFZj-9dPMGcdJE1Mbjs'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjQ4MmQ4YjExNDAwODkzZGY3M2YxMyIsImVtYWlsIjoiaGFhaGFhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTVUMTA6MDc6MzYuMzI3WiIsImlhdCI6MTcxMDQ5NzI1NiwiZXhwIjoxNzk2ODk3MjU2fQ.ep5j5vqzYsc6t-fgh1dJOVZ4CtcfU6JqMh25tmbORno'

  it('Call API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    await http.post('login', {
      email: 'haahaa@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh Token', async () => {
    setAccessTokenToLS(access_token_10s)
    setRefreshTokenToLS(refresh_token_1000days)
    const res = await http.get('me')
    
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
