import { FastifyReply, FastifyRequest } from 'fastify'
import { Product, ProdutoAtualizado } from '../../@types/produtos'
import { Packs } from '../../@types/packs'
import { knex } from '../../database'
import csvParser from 'csv-parser'
import { isWithinTolerance } from '../../utils/isWithinTolerance'

export async function uploadCSV(request: FastifyRequest, reply: FastifyReply) {
  const data = await request.file()

  if (!data) {
    return reply.status(400).send({ message: 'erro no arquivo enviado' })
  }

  // Verifica se o arquivo enviado é um CSV

  if (data.mimetype !== 'text/csv') {
    reply.status(400).send({ error: 'O arquivo enviado não é um CSV.' })
    return
  }
  // Cria um stream de leitura para o arquivo
  const stream = data.file.pipe(csvParser())

  const produtosDaBase: Product[] = await knex('products').select('*')
  const packsDaBase: Packs[] = await knex('packs').select('*')

  // Lê as linhas do arquivo

  const produtosAtualizados = []

  for await (const row of stream) {
    const productCode = row.product_code
    const newValue = row.new_price

    const produto = produtosDaBase.find(
      (item) => Number(item.code) === Number(productCode),
    )

    if (!produto) {
      const produtoAtualizado: ProdutoAtualizado = {
        codigo: 0,
        precoAtual: 0,
        nome: 'Produto não encontrado',
        novoPreco: Number(newValue),
        erros: [],
      }

      if (!newValue || Number(newValue) === null) {
        produtoAtualizado.erros.push({ error: 'Valor errado' })
      }
      if (!produto) {
        produtoAtualizado.erros.push({ error: 'Produto não encontrado' })
      }

      produtosAtualizados.push(produtoAtualizado)
      continue
    }

    // verifica se o novo valor do produto esta dentro da tolerancia de 10% de remarcação

    const isTolerance = isWithinTolerance({
      newValue,
      originalValue: produto.sales_price,
    })

    const produtoAtualizado: ProdutoAtualizado = {
      codigo: produto.code,
      nome: produto.name,
      precoAtual: produto.sales_price,
      novoPreco: Number(newValue),
      erros: [],
    }

    if (!newValue) {
      produtoAtualizado.erros.push({ error: 'Valor Errado' })
    }
    if (isTolerance.result === false) {
      produtoAtualizado.erros.push({ error: isTolerance.text })
    }

    produtosAtualizados.push(produtoAtualizado)

    // verifica se produto esta presente em algum pack
    const existsProductInPack = packsDaBase.find(
      (item) => Number(item.product_id) === Number(productCode),
    )

    if (existsProductInPack) {
      const packId = existsProductInPack.pack_id

      const nameOfPack = produtosDaBase.find(
        (item) => Number(item.code) === Number(packId),
      )

      if (!nameOfPack) {
        return
      }

      const productsInThePack = packsDaBase.filter(
        (item) => Number(item.pack_id) === Number(packId),
      )

      let valorDeCusto = 0
      let novoValor = 0

      // procura produtos relacionados nos packs
      for (const productInPack of productsInThePack) {
        const produtoDaBase = produtosDaBase.find(
          (item) => Number(item.code) === Number(productInPack.product_id),
        )

        if (produtoDaBase) {
          valorDeCusto =
            valorDeCusto + produtoDaBase.cost_price * productInPack.qty
          const produtoAtualizado = produtosAtualizados.find(
            (item) => Number(item.codigo) === Number(productInPack.product_id),
          )

          if (produtoAtualizado) {
            novoValor =
              novoValor + produtoAtualizado.novoPreco * productInPack.qty
          } else {
            novoValor =
              novoValor + produtoDaBase.sales_price * productInPack.qty
          }
        }
      }

      //   console.log(valorDeCusto)
      //   console.log(novoValor)

      const isTolerance = isWithinTolerance({
        newValue,
        originalValue: produto.sales_price,
      })

      const produtoAtualizado: ProdutoAtualizado = {
        codigo: nameOfPack.code,
        nome: nameOfPack.name,
        precoAtual: nameOfPack.sales_price,
        novoPreco: Number(novoValor),
        erros: [],
      }

      if (!novoValor) {
        produtoAtualizado.erros.push({ error: 'Valor Errado' })
      }
      if (isTolerance.result === false) {
        produtoAtualizado.erros.push({ error: isTolerance.text })
      }

      produtosAtualizados.push(produtoAtualizado)
    }
  }

  // Insere as linhas no banco de dados
  // await knex('minha_tabela').insert(rows)

  return reply.status(200).send(produtosAtualizados)
}
