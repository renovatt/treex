// export const shortNumber = (numero: number) => {
//   if (numero >= 1e6) {
//     return (numero / 1e6).toFixed(1) + 'M'
//   } else if (numero >= 1e3) {
//     return (numero / 1e3).toFixed(1) + 'k'
//   } else {
//     return numero.toString()
//   }
// }

export const shortNumber = (numero: number) => {
  if (numero >= 1e6) {
    return (
      (numero / 1e6).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + 'M'
    )
  } else if (numero >= 1e3) {
    return (
      (numero / 1e3).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + 'k'
    )
  } else {
    return numero.toLocaleString()
  }
}
