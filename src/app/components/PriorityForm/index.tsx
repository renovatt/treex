import Input from '../Input'
import SelectLevelPriority from '../SelectLevelPriority'
import SubmitButton from '../SubmitButton/indext'

export default function PriorityForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Monitor" type="text" />
      <SelectLevelPriority />
      <SubmitButton />
    </form>
  )
}
