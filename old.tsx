// 'use client'
// import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
// import { auth } from '@/firebase'
// import { UserData } from '@/lib/types'
// import { useState, useEffect } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import CardDolar from '@/components/features/cripto/_components/card-dolar'
// import WalletCard from '../../@globals/wallet-card'
// import { useGetDolar } from '@/hooks/use-get-dolar'

// export default function CriptoCards() {
//   const { data: dolar } = useGetDolar()
//   const [user, loading] = useAuthState(auth)
//   const [userLoaded, setUserLoaded] = useState<UserData | null>(null)

//   useEffect(() => {
//     if (user) {
//       setUserLoaded(user as UserData)
//     }
//   }, [user])

//   return (
//     <aside className="flex size-full flex-col items-center justify-start space-y-5">
//       <section className="flex w-full flex-col items-center justify-center space-y-4">
//         <section className="flex w-full items-center justify-start gap-4">
//           {userLoaded && !loading ? (
//             <CardDolar user={userLoaded} />
//           ) : (
//             <p>Carregando..</p>
//           )}

//           <WalletCard
//             title="Dolar hoje"
//             description="Dolar hoje"
//             icon={LiaMoneyBillWaveSolid}
//             value={Number(dolar?.data.USDBRL.high).toLocaleString('pt-BR', {
//               style: 'currency',
//               currency: 'BRL',
//             })}
//           />
//         </section>
//       </section>
//     </aside>
//   )
// }

//
// import Decimal from 'decimal.js'
// import { TransactionFormProps } from '@/schemas'

// export const calculateLastMonthsRevenue = (
//   data: TransactionFormProps[],
//   qnt: number = 11,
// ) => {
//   const currentDate = new Date()
//   const lastMonths = []

//   for (let i = qnt; i >= 0; i--) {
//     const month = new Date(currentDate)
//     month.setMonth(currentDate.getMonth() - i)
//     lastMonths.push(month)
//   }

//   const revenueByMonth = lastMonths.map((month) => {
//     const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
//     const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0)

//     const monthName = new Intl.DateTimeFormat('pt-BR', {
//       month: 'short',
//     }).format(month)

//     const capitalizedMonthName =
//       monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase()

//     const income = data
//       .filter((transaction) => {
//         const transactionDate = new Date(transaction.date ?? '')
//         return (
//           transactionDate >= firstDay &&
//           transactionDate <= lastDay &&
//           !transaction.transaction
//         )
//       })
//       .reduce(
//         (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
//         new Decimal(0),
//       )

//     const expenses = data
//       .filter((transaction) => {
//         const transactionDate = new Date(transaction.date ?? '')
//         return (
//           transactionDate >= firstDay &&
//           transactionDate <= lastDay &&
//           transaction.transaction
//         )
//       })
//       .reduce(
//         (total, transaction) => total.plus(new Decimal(transaction.value || 0)),
//         new Decimal(0),
//       )

//     const revenue = income.minus(expenses)

//     return {
//       month: capitalizedMonthName,
//       revenue: revenue.toNumber(),
//     }
//   })

//   return revenueByMonth
// }
