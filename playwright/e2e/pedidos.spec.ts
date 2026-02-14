import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {

  // Test Data
  const order = 'VLO-1S82UG'

  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act  
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
    const containerPedido = page.getByRole('paragraph') // = await page.locator('//p[text()="Pedido"]/../p[text()="VLO-1S82UG"]')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') //Sobe para o elemento pai (a div que aagrupa ambos os elementos p)

    await expect(containerPedido).toContainText('VLO-1S82UG')

    await expect(page.getByText('APROVADO')).toBeVisible()
})