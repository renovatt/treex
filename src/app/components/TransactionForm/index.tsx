import Input from '../Input'
import ToogleInput from '../ToogleInput'
import SubmitButton from '../SubmitButton/indext'
import SelectCategory from '../SelectCategory'

export default function TransactionForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Freelancer" type="text" />
      <Input label="Valor" placeholder="R$ 260,00" type="number" />
      <SelectCategory />
      <ToogleInput />
      <SubmitButton />
    </form>
  )
}
