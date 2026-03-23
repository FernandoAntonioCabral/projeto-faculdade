import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "@users";
const USER_LOGADO = "@user";

export async function criarAdminPadrao(){

  const users = await AsyncStorage.getItem(USERS_KEY);
  const lista = users ? JSON.parse(users) : [];

  const existeAdmin = lista.find(u => u.tipo === "admin");

  if(!existeAdmin){

    const admin = {
      nome: "Admin",
      username: "admin",
      senha: "123",
      tipo: "admin"
    };

    lista.push(admin);

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(lista));
  }
}

export async function cadastrarUsuario(novoUsuario){
  
  const userLogado = await getUser();

  if(novoUsuario.tipo === "vendedor" && userLogado?.tipo !== "admin"){
    throw new Error("Você não tem permissão para criar conta de vendedor");
  }

  if(!novoUsuario.username){
    throw new Error("Username é obrigatório");
  }

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