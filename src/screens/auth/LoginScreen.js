import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { login } from "../../services/authService";

export default function LoginScreen({ setUser, navigation }) {

  {/* //Função teste Limpar usuarios
  useEffect(() => {
    AsyncStorage.removeItem("@users");
  }, []);
  */}

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  async function fazerLogin(){

    const user = await login(username, password);

    if(user){
      setUser(user);
    }else{
      Alert.alert("Erro","Usuário ou senha inválidos");
    }
  }

  return(
    <View style={styles.container}>

      <Text style={styles.title}>Sistema de Pedidos</Text>

      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={fazerLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
        <Text style={{ textAlign:"center", marginTop:10 }}>
          Criar conta
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    padding:30,
    backgroundColor:"#fff"
  },

  title:{
    fontSize:26,
    textAlign:"center",
    marginBottom:30,
    fontWeight:"bold"
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:12,
    marginBottom:15,
    borderRadius:8
  },

  button:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:8,
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});