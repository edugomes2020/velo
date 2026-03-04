import { Page, expect } from '@playwright/test'
import { OrderDetails, OrderStatus } from './orderLookupActions'

export type Colors = 'Glacier Blue' | 'Midnight Black' | 'Lunar White'

export type Wheels = 'Aero Wheels' | 'Sport Wheels' 

export type Optionals = 'Precision Park' | 'Flux Capacitor'


export function orderConfiguratorActions(page: Page) {

  const colors = page.getByTestId('section-cores')
  const searchButton = page.getByRole('button', { name: 'Buscar Pedido' })

  return {

    // elements: {
    //   orderInput,
    //   searchButton
    // },

    async open() {
      await page.goto('/configure')
      await expect(page.locator('div').filter({ hasText: 'Configure seuVelô Sprint' }).nth(4)).toBeVisible();
    },

    async searchColors(code: string) {
      await expect(colors).toMatchAriaSnapshot(`
        - heading "Cor" [level=3]
        - button "Glacier Blue"
        - button "Midnight Black"
        - button "Lunar White"
        `);
    },

    async searchColors(code: string) {
      await expect(colors).toMatchAriaSnapshot(`
        - heading "Cor" [level=3]
        - button "Glacier Blue"
        - button "Midnight Black"
        - button "Lunar White"
        `);
    },


    async validateStatusBadge(status: OrderStatus) {
      const statusClasses = {
        APROVADO: {
          background: 'bg-green-100',
          text: 'text-green-700',
          icon: 'lucide-circle-check-big',
        },
        REPROVADO: {
          background: 'bg-red-100',
          text: 'text-red-700',
          icon: 'lucide-circle-x',
        },
        EM_ANALISE: {
          background: 'bg-amber-100',
          text: 'text-amber-700',
          icon: 'lucide-clock',
        },
      } as const

      const classes = statusClasses[status]
      const statusBadge = page.getByRole('status').filter({ hasText: status })

      await expect(statusBadge).toHaveClass(new RegExp(classes.background))
      await expect(statusBadge).toHaveClass(new RegExp(classes.text))
      await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(classes.icon))
    },

    async validateOrderNotFound() {
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
    },
  }
}