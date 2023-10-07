import Input from '../Input'
import SubmitButton from '../SubmitButton/indext'

export default function MonthPreviewForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Faculdade" type="text" />
      <Input label="Valor" placeholder="R$ 120,00" type="number" />
      <SubmitButton />
    </form>
  )
}
