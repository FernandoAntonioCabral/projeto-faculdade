import { produtos } from '../services/produtos';

const buscarPreco = (nomeProduto, tamanho) => {
  const produto = produtos.find(p => p.nome === nomeProduto);

  if (!produto) return 0;

  const tamanhoObj = produto.tamanhos.find(t => t.tamanho === tamanho);

  return tamanhoObj ? tamanhoObj.preco : 0;
};

export const adicionarTotalPedido = (pedidos) => {
  return pedidos.map(pedido => {
    
    const total = pedido.itens
      ? pedido.itens.reduce((soma, item) => {
          const preco = buscarPreco(item.nome, item.tamanho);
          return soma + (item.quantidade * preco);
        }, 0)
      : 0;

    return {
      ...pedido,
      total
    };
  });
};