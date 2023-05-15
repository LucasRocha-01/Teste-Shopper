import { useProdutos } from '../../data/hooks/useProdutos'
import Button from '../../assets/components/button'
import { Container, SubmitButton } from './style'
import WhithinTolerance from '../../assets/components/WithinTolerance'
import { TableProducts, TrProducts } from '../../assets/global_style'

const UploadCSV = () => {
  const {
    handleSubmit,
    handleFileChange,
    produtosForAtt,
    haveFalse,
    submitProdutosAlterados,
  } = useProdutos()

  return (
    <Container>
      <span>Shopper</span>
      <h1>Upload CSV</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="VALIDAR" />
        </form>
      </div>
      <div>
        {produtosForAtt.length > 0 ? (
          <TableProducts>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nome</th>
                <th>Preço Atual</th>
                <th>Novo Preço</th>
                <th>Dentro 10%+/-</th>
              </tr>
            </thead>
            <tbody>
              {produtosForAtt.map((produto, index) => (
                <TrProducts key={index + '-' + produto.codigo}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>
                    R${' '}
                    {produto.precoAtual
                      ? produto.precoAtual.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : 'NaN'}
                  </td>
                  <td>
                    R${' '}
                    {produto.novoPreco
                      ? produto.novoPreco.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : 'NaN'}
                  </td>
                  <td>
                    <WhithinTolerance erros={produto.erros} />
                  </td>
                </TrProducts>
              ))}
            </tbody>
          </TableProducts>
        ) : (
          ''
        )}
      </div>
      <Button to={'/'} text={'Voltar para Lista de Produtos'} colorBG="red" />

      {produtosForAtt.length > 0 ? (
        <SubmitButton
          havefalse={haveFalse === true ? 'true' : 'false'}
          disabled={haveFalse}
          onClick={() => submitProdutosAlterados(produtosForAtt)}
        >
          {haveFalse ? 'Seu CSV contem erros' : 'Enviar Alterações'}
        </SubmitButton>
      ) : (
        ''
      )}
    </Container>
  )
}

export default UploadCSV
