import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http } from 'msw'
import config from './src/constants/config'
import HttpStatusCode from './src/constants/httpStatusCode.enum'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjQ4MmQ4YjExNDAwODkzZGY3M2YxMyIsImVtYWlsIjoiaGFhaGFhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMThUMTM6MDg6MTkuNTAwWiIsImlhdCI6MTcxMDc2NzI5OSwiZXhwIjoxNzEwODUzNjk5fQ.VZaSeoOc43fsV593OYur8fcYxo-yYuycCiR8fV0LOWk',
    expires: 86400,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjQ4MmQ4YjExNDAwODkzZGY3M2YxMyIsImVtYWlsIjoiaGFhaGFhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMThUMTM6MDg6MTkuNTAwWiIsImlhdCI6MTcxMDc2NzI5OSwiZXhwIjoxNzI0NTkxMjk5fQ.Nj2_F-8A-tzR4wWr8ghbkH156HQ85vthQlgqJDI8DCo',
    expires_refresh_token: 13824000,
    user: {
      _id: '65b482d8b11400893df73f13',
      roles: ['User'],
      email: 'haahaa@gmail.com',
      createdAt: '2024-01-27T04:13:12.387Z',
      updatedAt: '2024-02-06T08:10:40.321Z',
      __v: 0,
      date_of_birth: '1899-12-31T16:53:30.000Z',
      name: 'a'
    }
  }
}

export const restHandlers = [
  http.post(`${config.baseUrl}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
