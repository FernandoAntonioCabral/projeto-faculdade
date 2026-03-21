import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { logout } from "../../services/authService";

export default function VendedorDashboard({ navigation, setUser }) {

  async function handleLogout(){
    await logout();
    setUser(null);
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Painel do Vendedor
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Pedidos")}
      >
        <Ionicons name="clipboard-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          Ver Pedidos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          Sair
        </Text>
      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:30,
    backgroundColor:"#f5f6fa",
    justifyContent:"center"
  },

  header:{
    alignItems:"center",
    marginBottom:40
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    marginTop:10
  },

  button:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:8,
    marginBottom:15
  },

  logoutButton:{
    backgroundColor:"#e74c3c",
    padding:15,
    borderRadius:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:8
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});