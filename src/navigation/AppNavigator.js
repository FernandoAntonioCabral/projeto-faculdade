import React, { useEffect, useState } from "react";
import { getUser } from "../services/authService";
import { limparPedidosAntigos } from "../services/storage";
import { limparPedidos } from "../services/storage";

import AuthNavigator from "./AuthNavigator";
import ClienteNavigator from "./ClienteNavigator";
import VendedorNavigator from "./VendedorNavigator";

export default function AppNavigator(){

  const [user,setUser] = useState(undefined);

  useEffect(()=>{
    loadUser();
    limparPedidosAntigos();
  },[]);

  async function limparTudo(){
    await limparPedidos();
    loadUser();
  }

  async function loadUser(){
    const u = await getUser();
    setUser(u);
  }

  if(user === undefined){
    return null;
  }

  if(!user){
    return <AuthNavigator setUser={setUser} />;
  }

  if(user.tipo === "cliente"){
    return <ClienteNavigator setUser={setUser} />;
  }

  return <VendedorNavigator setUser={setUser} />;

}