import Input from '../Input'
import CustomButton from '../CustomButton'

export default function EditMonthPreviewForm() {
  return (
    <form>
      <Input label="Nome" placeholder="Faculdade" type="text" />
      <Input label="Valor" placeholder="R$ 120,00" type="number" />
      <CustomButton title="Salvar" type="submit" />
      <CustomButton title="Apagar" type="button" />
    </form>
  )
}
