import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@caixa";

export async function salvarMovimento(novo){
  const data = await AsyncStorage.getItem(KEY);
  const lista = data ? JSON.parse(data) : [];

  lista.push(novo);

  await AsyncStorage.setItem(KEY, JSON.stringify(lista));
}

export async function getMovimentos(){
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}