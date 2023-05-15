import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ListaDeProdutos from '../pages/ListaDeProdutos'
import UploadCSV from '../pages/UploadCSV'

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<ListaDeProdutos />} path="/" exact />
      <Route element={<UploadCSV />} path="/upload" />
    </Routes>
  )
}

export default MyRoutes
