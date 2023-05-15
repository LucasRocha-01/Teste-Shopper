import { useProdutos } from '../../data/hooks/useProdutos'
import { Container } from './style'
import Button from '../../assets/components/button'
import { TableProducts, TrProducts } from '../../assets/global_style'

const ListaDeProdutos = () => {
  const { produtos } = useProdutos()

  return (
    <Container>
      <span>Shopper - Dashboard</span>
      <h1>Lista de Produtos</h1>
      <div className="card">
        <TableProducts>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nome</th>
              <th>Preço de Custo</th>
              <th>Preço de Venda</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <TrProducts key={produto.code}>
                <td>{produto.code}</td>
                <td>{produto.name}</td>
                <td>
                  R${' '}
                  {produto.cost_price.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  R${' '}
                  {produto.sales_price.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </TrProducts>
            ))}
          </tbody>
        </TableProducts>
      </div>
      <Button to={'/upload'} text={'Subir CSV Atualizado'} />
    </Container>
  )
}

export default ListaDeProdutos
