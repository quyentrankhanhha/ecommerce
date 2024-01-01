import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/ultils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCard(body: { productId: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}/add-to-cart`, {
      params
    })
  }
}

export default purchaseApi
