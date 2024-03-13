import { describe, expect, it } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

describe('isAxiosError', () => {
  it('isAxiosError returns boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError returns boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
  })
})
