export const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
}
