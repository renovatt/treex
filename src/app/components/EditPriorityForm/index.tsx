import Input from '../Input'
import DeleteButton from '../DeleteButton'
import SubmitButton from '../SubmitButton/indext'
import SelectLevelPriority from '../SelectLevelPriority'

export default function EditPriorityForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Monitor" type="text" />
      <SelectLevelPriority />
      <SubmitButton />
      <DeleteButton />
    </form>
  )
}
