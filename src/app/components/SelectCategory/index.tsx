export default function SelectCategory() {
  return (
    <div className="my-4 mb-6">
      <label
        htmlFor="category"
        className="mb-2 block text-sm font-medium text-primary-800"
      >
        Categoria
      </label>
      <select
        id="category"
        className="focus:primary-750 dark:focus:primary-750 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none transition-all ease-in-out focus:border-primary-750 dark:border-gray-600 dark:bg-primary-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-750"
      >
        <option selected>Selecione a categoria</option>
        <option value="Estudos">Estudos</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Remédio">Remédio</option>
        <option value="Combustível">Combustível</option>
      </select>
    </div>
  )
}
