/**
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

export const mockManager = {
  getData: async(api, params, options) => {
    const moduleName = api.useMock
    const mockData = await import('~/mock-data/' + moduleName + '.js')
    const data = mockData.default[api.operationId](params, options)

    return data
  }
}
