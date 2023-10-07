import Input from '../Input'
import DeleteButton from '../DeleteButton'
import SubmitButton from '../SubmitButton/indext'

export default function EditMonthPreviewForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Faculdade" type="text" />
      <Input label="Valor" placeholder="R$ 120,00" type="number" />
      <SubmitButton />
      <DeleteButton />
    </form>
  )
}
