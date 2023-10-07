import Input from '../Input'
import SwitchInput from '../SwitchInput'
import CustomButton from '../CustomButton'
import SelectCategory from '../SelectCategory'

export default function TransactionForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Freelancer" type="text" />
      <Input label="Valor" placeholder="R$ 260,00" type="number" />
      <SelectCategory />
      <SwitchInput />
      <CustomButton title="Salvar" type="submit" />
    </form>
  )
}
