export default function Measure({ handleMeasureChange }) {
  return (
    <div>
      <label htmlFor="measure">Mois/Année</label>
      <select name="measure" id="measure" onChange={handleMeasureChange}>
        <option value="month">Mois</option>
        <option value="year">Année</option>
      </select>
    </div>
  )
}