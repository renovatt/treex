import Input from '../Input'
import CustomButton from '../CustomButton'
import SelectLevelPriority from '../SelectLevelPriority'

export default function EditPriorityForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Monitor" type="text" />
      <SelectLevelPriority />
      <CustomButton title="Salvar" type="submit" />
      <CustomButton title="Apagar" type="button" />
    </form>
  )
}
