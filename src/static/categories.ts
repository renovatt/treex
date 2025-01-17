import {
  DollarSign,
  ShoppingBag,
  Book,
  Pill,
  Utensils,
  Car,
  CreditCard,
  HeartPulse,
  Home,
  PawPrint,
  PiggyBank,
  Fuel,
  Shirt,
  ShowerHead,
  Gamepad2,
  FileSliders,
  FileText,
  Globe,
  Plane,
  ShoppingCart,
} from 'lucide-react'

export const categories = [
  { name: 'Bônus/Entrada/Salário', icon: DollarSign },
  { name: 'Economias/Investimentos', icon: PiggyBank },
  { name: 'Pagamentos', icon: CreditCard },
  { name: 'Despesas Diversas', icon: ShoppingBag },
  { name: 'Educação', icon: Book },
  { name: 'Farmácia', icon: Pill },
  { name: 'Alimentação', icon: Utensils },
  { name: 'Combustível', icon: Fuel },
  { name: 'Transporte', icon: Car },
  { name: 'Lazer e hobbies', icon: Gamepad2 },
  { name: 'Internet', icon: Globe },

  { name: 'Compras', icon: ShoppingBag },
  { name: 'Dívidas e Empréstimos', icon: FileSliders },
  { name: 'Viagem', icon: Plane },
  { name: 'Impostos e Taxas', icon: FileText },
  { name: 'Mercado', icon: ShoppingCart },

  { name: 'Saúde', icon: HeartPulse },
  { name: 'Higiene', icon: ShowerHead },
  { name: 'Vestuário', icon: Shirt },
  { name: 'Veículo', icon: Car },
  { name: 'Moradia', icon: Home },
  { name: 'Animais de Estimação', icon: PawPrint },
  { name: 'Outros', icon: ShoppingBag },
]

export const incomeCategories = [
  'Bônus/Entrada/Salário',
  'Economias/Investimentos',
]
