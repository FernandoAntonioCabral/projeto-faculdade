import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "PEDIDOS";

export async function getPedidos(){

  const data = await AsyncStorage.getItem(KEY);

  return data ? JSON.parse(data) : [];

}

export async function salvarPedido(pedido){

  const pedidos = await getPedidos();

  pedidos.push(pedido);

  await AsyncStorage.setItem(KEY, JSON.stringify(pedidos));

}

export async function limparPedidosAntigos(){

  const data = await getPedidos();

  const agora = Date.now();

  const pedidosValidos = data.filter(p => {

    const tempoPedido = agora - p.data;

    const limite = 7 * 24 * 60 * 60 * 1000;

    return tempoPedido < limite;

  });

  await AsyncStorage.setItem("PEDIDOS", JSON.stringify(pedidosValidos));

}

export async function limparPedidos(){
  await AsyncStorage.removeItem("PEDIDOS");
}