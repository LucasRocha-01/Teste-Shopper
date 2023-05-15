export interface Product {
  code: number
  name: string
  cost_price: number
  sales_price: number
}

export interface ProdutoAtualizado {
  codigo: number
  nome: string
  precoAtual: number
  novoPreco: number
  erros: { error: string }[]
}
