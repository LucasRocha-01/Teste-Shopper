import { useState, useEffect } from 'react'
import { ApiService } from '../services/api'

export function useProdutos() {
  const [produtos, setProdutos] = useState([])
  const [produtosForAtt, setProdutosForAtt] = useState([])
  const [file, setFile] = useState('')
  const [haveFalse, setHaveFalse] = useState('default')

  useEffect(() => {
    ApiService.get('/products')
      .then((response) => {
        setProdutos(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    const haveFalseProducts = produtosForAtt.findIndex(
      (item) => item.erros.length > 0,
    )
    setHaveFalse(haveFalseProducts !== -1)
  }, [produtosForAtt])

  async function submitProdutosAlterados(produtosForAtt) {
    try {
      await ApiService.patch(
        'products/atualizar',
        JSON.stringify(produtosForAtt),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then(() => {
        alert('Tudo Certo')
        setProdutosForAtt([])
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleFileChange(event) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    setProdutosForAtt([])
    setHaveFalse('default')
    event.preventDefault()
    const formData = new FormData()

    if (file.length === 0) {
      alert('Voce deve fazer upload de um arquivo csv.')
      return
    }

    formData.append('file', file)
    try {
      const response = await ApiService.post('/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setProdutosForAtt(response.data)
    } catch (error) {
      alert(error.response.data.error)
      console.error(error)
    }
  }

  return {
    submitProdutosAlterados,
    haveFalse,
    produtosForAtt,
    produtos,
    handleSubmit,
    handleFileChange,
  }
}
