import { delay, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'
describe('ProductDetail', () => {
  test('Render UI ProductDetail', async () => {
    renderWithRouter({ route: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-id-60afb2c76ef5b902180aacba' })
    delay(1000)
    expect(document.body).toMatchSnapshot()
  })
})
