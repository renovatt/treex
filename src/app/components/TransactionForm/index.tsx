import Input from '../Input'
import ToogleInput from '../ToogleInput'
import SubmitButton from '../SubmitButton/indext'

export default function TransactionForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Freelancer" />
      <Input label="Valor" placeholder="R$ 260,00" />
      <ToogleInput />
      <SubmitButton />
    </form>
  )
}
