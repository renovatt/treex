import CustomButton from '../CustomButton'
import Input from '../Input'

export default function MonthPreviewForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Faculdade" type="text" />
      <Input label="Valor" placeholder="R$ 120,00" type="number" />
      <CustomButton title="Salvar" type="submit" />
    </form>
  )
}
