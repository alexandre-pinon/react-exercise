import { SearchResult } from '../types/results'

type TableProps = {
  data: SearchResult
}

const Table = ({ data }: TableProps) => {
  const keys = Object.keys(data) as (keyof SearchResult)[]

  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key) => {
          const rowData = data[key]
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{Array.isArray(rowData) ? rowData.join(' - ') : rowData}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
