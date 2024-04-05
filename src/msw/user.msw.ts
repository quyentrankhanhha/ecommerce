import { access_token_10s } from 'src/msw/auth.msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { http, HttpResponse, DefaultBodyType, StrictRequest } from 'msw'

const userRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '65947104b11400893df7216a',
    roles: ['User'],
    email: 'haaquyentk@gmail.com',
    createdAt: '2024-01-02T20:24:36.774Z',
    updatedAt: '2024-01-02T20:24:36.774Z'
  }
}

const userRequest = http.get<never, StrictRequest<DefaultBodyType>, any>(`${config.baseUrl}me`, ({ request }) => {
  const access_token = request.headers.get('authorization')

  if (access_token == access_token_10s) {
    return HttpResponse.json({
      status: HttpStatusCode.Unauthorized,
      message: 'Lỗi',
      data: {
        message: 'Token hết hạn',
        name: 'EXPIRED_TOKEN'
      }
    })
  }
  return HttpResponse.json({
    status: HttpStatusCode.Ok,
    data: userRes
  })
})

const userRequests = [userRequest]

export default userRequests
