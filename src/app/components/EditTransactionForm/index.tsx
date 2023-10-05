import Input from '../Input'
import SwitchInput from '../SwitchInput'
import SubmitButton from '../SubmitButton/indext'
import SelectCategory from '../SelectCategory'

export default function EditTransactionForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Freelancer" type="text" />
      <Input label="Valor" placeholder="R$ 260,00" type="number" />
      <SelectCategory />
      <SwitchInput />
      <SubmitButton />
    </form>
  )
}
