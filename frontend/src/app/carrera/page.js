// src/pages/ExamplePage.js
import React from 'react'
import CustomTable from '../../components/Table'

const Page = () => {
  const columns = ["Name", "Age", "Location"];
  const data = [
    ["John Doe", 28, "New York"],
    ["Jane Smith", 34, "San Francisco"],
    ["Sam Johnson", 23, "Los Angeles"],
  ];

  return (
    <div>
      <h1>Example Page</h1>
      <CustomTable columns={columns} data={data} caption="Carreras en la base de datos" />
    </div>
  )
}

export default Page;
