import CustomButton from '../CustomButton'
import Input from '../Input'
import SelectLevelPriority from '../SelectLevelPriority'

export default function PriorityForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Monitor" type="text" />
      <SelectLevelPriority />
      <CustomButton title="Salvar" type="submit" />
    </form>
  )
}
