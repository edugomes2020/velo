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
  await expect(page.getByTestId('order-result-'+ order)).toContainText(order+'APROVADO')

})