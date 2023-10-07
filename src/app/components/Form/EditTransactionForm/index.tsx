import Input from '../Input'
import SwitchInput from '../SwitchInput'
import SelectCategory from '../SelectCategory'
import CustomButton from '../CustomButton'

export default function EditTransactionForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Freelancer" type="text" />
      <Input label="Valor" placeholder="R$ 260,00" type="number" />
      <SelectCategory />
      <SwitchInput />
      <CustomButton title="Salvar" type="submit" />
      <CustomButton title="Apagar" type="button" />
    </form>
  )
}
