import React from "react";
import HeaderUsuario from "../../components/HeaderUsuario";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../../services/authService";

export default function ClienteHome({ navigation, setUser }) {

  async function handleLogout(){
    await logout();
    setUser(null);
  }

  return (

    <View style={styles.container}>

      <View style={styles.topo}>
        <HeaderUsuario />
      </View>

      <View style={styles.conteudo}>

        <Text style={styles.title}>
          Área do Cliente
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Pedido")}
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            Fazer Pedido
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Historico")}
        >
          <Ionicons name="receipt-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            Meus Pedidos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logout}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>
            Sair
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f5f6fa",
    padding:20
  },

  topo:{
    marginTop:20,
  },

  conteudo:{
    flex:1,
    justifyContent:"center"
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:40
  },

  button:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:10,
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:8,
    marginBottom:20
  },

  logout:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:10,
    backgroundColor:"#e74c3c",
    padding:15,
    borderRadius:8
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});