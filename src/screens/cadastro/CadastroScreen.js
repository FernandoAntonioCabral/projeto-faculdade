import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { cadastrarUsuario } from "../../services/authService";

export default function CadastroScreen({ navigation }){

  const [nome,setNome] = useState("");
  const [username, setUsername] = useState("");
  const [senha,setSenha] = useState("");
  const [tipo, setTipo] = useState(null);

  async function cadastrar(){

    if(!nome || !username || !senha || !tipo){
      Alert.alert("Erro","Preencha todos os campos");
      return;
    }
    try {
      await cadastrarUsuario({ nome, username, senha, tipo });

      Alert.alert("Sucesso","Conta criada!");
      navigation.goBack();
      
    }catch(error){
      Alert.alert("Erro", error.message);
    }
    
  }

  return(
    <View style={styles.container}>

      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />

      <Text style={styles.label}>Tipo de conta</Text>
      
      <View style={styles.tipoContainer}>

        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipo === "cliente" && styles.tipoSelecionado
          ]}
          onPress={() => setTipo("cliente")}
        >
          <Text style={styles.tipoTexto}>Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipo === "vendedor" && styles.tipoSelecionado
          ]}
          onPress={() => setTipo("vendedor")}
        >
          <Text style={styles.tipoTexto}>Vendedor</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:24, fontWeight:"bold", marginBottom:20 },
  input:{
    borderWidth:1,
    borderColor:"#ccc",
    padding:10,
    marginBottom:10,
    borderRadius:6
  },
  button:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:8,
    alignItems:"center"
  },
  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },
  
  label:{
    fontWeight:"bold",
    marginBottom:5
  },

  tipoContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:15
  },

  tipoButton:{
    flex:1,
    padding:10,
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    alignItems:"center",
    marginHorizontal:5
  },

  tipoSelecionado:{
    backgroundColor:"#2f80ed"
  },

  tipoTexto:{
    color:"#333",
    fontWeight:"bold"
  }
});