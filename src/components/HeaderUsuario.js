import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../services/authService";

export default function HeaderUsuario(){

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function carregar(){
      const u = await getUser();
      setUser(u);
    }
    carregar();
  }, []);

  if(!user) return null;

  function formatar(tipo){
    if(tipo === "admin") return "Admin 👑";
    if(tipo === "vendedor") return "Vendedor 🛒";
    return "Cliente 👤";
  }

  return(
    <View style={styles.container}>

      <Text style={styles.text}>
        Bem-vindo, {user.nome} ({formatar(user.tipo)})
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    alignItems:"center",
    gap:8,
    marginBottom:15
  },

  text:{
    fontSize:12,
    fontWeight:"bold",
    color:"#333"
  }

});