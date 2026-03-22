import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "@users";
const USER_LOGADO = "@user";

export async function cadastrarUsuario(novoUsuario){

  const users = await AsyncStorage.getItem(USERS_KEY);
  const lista = users ? JSON.parse(users) : [];

  const existe = lista.find(
    u => u.username.toLowerCase() === novoUsuario.username.toLowerCase()
  );

  if(existe){
    throw new Error("Usuário já existe");
  }
  
  lista.push(novoUsuario);

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(lista));
}

export async function login(username, senha){

  const users = await AsyncStorage.getItem(USERS_KEY);
  const lista = users ? JSON.parse(users) : [];

  const user = lista.find(
    u => u.username === username && u.senha === senha
  );

  if(user){
    await AsyncStorage.setItem(USER_LOGADO, JSON.stringify(user));
    return user;
  }

  return null;
}

export async function getUser(){
  const user = await AsyncStorage.getItem(USER_LOGADO);
  return user ? JSON.parse(user) : null;
}

export async function logout(){
  await AsyncStorage.removeItem(USER_LOGADO);
}