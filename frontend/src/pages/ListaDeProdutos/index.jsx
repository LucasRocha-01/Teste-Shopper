import { useProdutos } from '../../data/hooks/useProdutos'
import { AvisoNoData, Container } from './style'
import Button from '../../assets/components/button'
import { TableProducts, TrProducts } from '../../assets/global_style'

const ListaDeProdutos = () => {
  const { produtos } = useProdutos()

  return (
    <Container>
      <span>Shopper - Dashboard</span>
      <h1>Lista de Produtos</h1>

      {produtos.length > 0 ? (
        <div>
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
      ) : (
        <AvisoNoData>
          <h2>Sem Dados</h2>
          <p>
            Opa, você ainda não tem dados no seu banco.
            <br /> Volte quando subir
          </p>
        </AvisoNoData>
      )}

      <Button to={'/upload'} text={'Subir CSV Atualizado'} />
    </Container>
  )
}

export default ListaDeProdutos
