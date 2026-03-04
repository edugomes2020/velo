import { test as base } from '@playwright/test'

import { createOrderLookupActions } from './actions/orderLookupActions'
import { orderConfiguratorActions } from './actions/orderConfiguratorActions'

type App = {
  orderLookup: ReturnType<typeof createOrderLookupActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLookupActions(page),
      orderConfigurator: orderConfiguratorActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'