import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { http, HttpResponse } from 'msw'

export const access_token_10s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjQ4MmQ4YjExNDAwODkzZGY3M2YxMyIsImVtYWlsIjoiaGFhaGFhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTVUMTA6MDc6MzYuMzI3WiIsImlhdCI6MTcxMDQ5NzI1NiwiZXhwIjoxNzEwNDk3NjE2fQ.EiCY0qezKPlb5GOgXjIw_W34pFZj-9dPMGcdJE1Mbjs'
export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjQ4MmQ4YjExNDAwODkzZGY3M2YxMyIsImVtYWlsIjoiaGFhaGFhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTVUMTA6MDc6MzYuMzI3WiIsImlhdCI6MTcxMDQ5NzI1NiwiZXhwIjoxNzk2ODk3MjU2fQ.ep5j5vqzYsc6t-fgh1dJOVZ4CtcfU6JqMh25tmbORno'

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

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTQ3MTA0YjExNDAwODkzZGY3MjE2YSIsImVtYWlsIjoiaGFhcXV5ZW50a0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDI0LTA0LTA0VDE4OjAyOjM3LjUyOFoiLCJpYXQiOjE3MTIyNTM3NTcsImV4cCI6MTcyNjA3Nzc1N30.6QwFFfjwEzfys3BE9B3D-kOPjzcq0l7VWxnIxqVZ7hY'
  }
}

const loginRequest = http.post(`${config.baseUrl}login`, () => {
  return HttpResponse.json({
    status: HttpStatusCode.Ok,
    data: loginRes
  })
})

const refreshToken = http.post(`${config.baseUrl}refresh-access-token`, () => {
  return HttpResponse.json({
    status: HttpStatusCode.Ok,
    data: refreshTokenRes
  })
})

const authRequests = [loginRequest, refreshToken]

export default authRequests
