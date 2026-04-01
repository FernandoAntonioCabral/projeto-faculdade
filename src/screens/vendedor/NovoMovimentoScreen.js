import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { salvarMovimento } from "../../services/caixaService";

export default function NovoMovimentoScreen({ navigation }) {

  const [tipo, setTipo] = useState(null);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");

  async function salvar(){

    if(!tipo || !valor || !descricao){
      Alert.alert("Erro","Preencha os campos obrigatórios");
      return;
    }

    const novo = {
      id: Date.now(),
      tipo,
      valor: parseFloat(valor),
      descricao,
      observacao,
      data: Date.now()
    };

    await salvarMovimento(novo);

    Alert.alert("Sucesso","Movimentação salva!");

    navigation.goBack();
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>
        <Ionicons name="swap-horizontal-outline" size={24} color="#fff" />
        <Text style={styles.title}> Nova Movimentação </Text>
      </View>

      <Text style={styles.label}>Tipo</Text>

      <View style={styles.tipoContainer}>

        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipo === "entrada" && styles.entradaSelecionado
          ]}
          onPress={() => setTipo("entrada")}
        >
          <Ionicons name="arrow-down-circle-outline" size={20} color="green" />
          <Text style={styles.tipoTexto}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipo === "saida" && styles.saidaSelecionado
          ]}
          onPress={() => setTipo("saida")}
        >
          <Ionicons name="arrow-up-circle-outline" size={20} color="red" />
          <Text style={styles.tipoTexto}>Saída</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.label}>Valor</Text>

      <TextInput
        placeholder="Ex: 50"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        style={styles.input}
      />

      <Text style={styles.label}>Descrição</Text>

      <TextInput
        placeholder="Ex: Venda de bolo"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <Text style={styles.label}>Observação</Text>

      <TextInput
        placeholder="Opcional"
        value={observacao}
        onChangeText={setObservacao}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvar}
      >
        <Text style={styles.buttonText}>
          Salvar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f5f6fa"
  },

  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:8,
    marginBottom:20
  },

  title:{
    fontSize:24,
    fontWeight:"bold"
  },

  label:{
    fontWeight:"bold",
    marginBottom:5,
    marginTop:10
  },

  input:{
    backgroundColor:"#fff",
    padding:12,
    borderRadius:8,
    borderWidth:1,
    borderColor:"#ddd"
  },

  tipoContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10
  },

  tipoButton:{
    flex:1,
    padding:12,
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    alignItems:"center",
    marginHorizontal:5,
    flexDirection:"row",
    justifyContent:"center",
    gap:5
  },

  entradaSelecionado:{
    backgroundColor:"#d4edda"
  },

  saidaSelecionado:{
    backgroundColor:"#f8d7da"
  },

  tipoTexto:{
    fontWeight:"bold"
  },

  button:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginTop:20
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  }

});