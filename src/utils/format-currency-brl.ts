export const formatteCurrency = (value: number) => {
  if (isNaN(value)) {
    throw new Error('Invalid number provided')
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
