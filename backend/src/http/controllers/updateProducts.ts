import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../database'
import { isWithinTolerance } from '../../utils/isWithinTolerance'
import { ProdutoAtualizado } from '../../@types/produtos'

export async function updateProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const produtosAtualizados = (await request.body) as ProdutoAtualizado[]

  const hasRemarkOutTolerance = produtosAtualizados.findIndex(
    (item) => item.erros.length > 0,
  )

  if (hasRemarkOutTolerance !== -1) {
    return reply.status(400).send({
      message: 'Existem produtos com valor fora do range de valor permitido',
    })
  }

  for (const produtoAtt of produtosAtualizados) {
    if (
      !isWithinTolerance({
        newValue: produtoAtt.novoPreco,
        originalValue: produtoAtt.precoAtual,
      }).result
    ) {
      return reply.status(400).send({
        message: 'Existem produtos com valor fora do range de valor permitido',
      })
    }

    await knex('products')
      .where('code', produtoAtt.codigo)
      .update({ sales_price: produtoAtt.novoPreco })
  }

  return reply.status(200).send(produtosAtualizados)
}
