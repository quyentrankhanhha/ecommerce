import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/ultils.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi
