import React, { useState, useEffect } from "react";
import { produtos } from '../../services/produtos';
import { adicionarTotalPedido } from '../../utils/PedidosController';
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList
} from "react-native";

import { salvarPedido } from "../../services/storage";
import { getUser } from "../../services/authService";

export default function PedidoScreen({ navigation }) {

  const [cliente,setCliente] = useState("");
  const [itens,setItens] = useState([]);
  const [user,setUser] = useState(null);

  useEffect(()=>{
    carregarUsuario();
  },[]);

  async function carregarUsuario(){

    const u = await getUser();

    if(u){
      setUser(u);
      setCliente(u.nome);
    }

  }

  function abrirCatalogo(){

    navigation.navigate("Catalogo",{
      adicionarProduto
    });

  }

  function adicionarProduto(produto){
    setItens([...itens, produto]);
  }

  async function enviarPedido(){

    if(itens.length === 0){
      Alert.alert("Erro","Adicione produtos");
      return;
    }

    const pedido = {
      id: Date.now(),
      cliente: user.nome,
      itens,
      data: Date.now()
    };

    await salvarPedido(pedido);
    Alert.alert("Sucesso","Pedido enviado");

    setItens([]);

    navigation.goBack();

  }

  function buscarPreco(nomeProduto, tamanho){
    const produto = produtos.find(p => p.nome === nomeProduto);

    if(!produto) return 0;

    const tamanhoObj = produto.tamanhos.find(t => t.tamanho === tamanho);
    return tamanhoObj ? tamanhoObj.preco : 0;
  }

  function calcularTotal(){
    return itens.reduce((total, item) => {
      const preco = buscarPreco(item.nome, item.tamanho);
      return total + (item.quantidade * preco);
    }, 0);
  }

  function removerItem(index){
    const novaLista = [...itens];
    novaLista.splice(index,1);
    setItens(novaLista);
  }

  function renderItem({item,index}){

    return(

      <View style={styles.itemContainer}>

        <Text style={styles.itemTexto}>
          {item.nome} ({item.tamanho}) x{item.quantidade}
          {" - R$ "}{(item.quantidade * item.preco).toFixed(2)}
        </Text>

        <TouchableOpacity
          style={styles.removerBotao}
          onPress={()=>removerItem(index)}
        >
          <Ionicons name="trash" size={22} color="white" />
        </TouchableOpacity>

      </View>
    )

  }

  return(

    <View style={styles.container}>
      
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={24} color="#fff" />
        <Text style={styles.title}>Novo Pedido</Text>
      </View>

      <TouchableOpacity
        style={styles.catalogo}
        onPress={abrirCatalogo}
      >

        <Ionicons name="add-circle-outline" size={22} color="white" />

        <Text style={styles.catalogoTexto}>
          Adicionar Produto
        </Text>

      </TouchableOpacity>

      <FlatList 
        data={itens}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={renderItem}
      />

      {itens.length > 0 && (
        <Text style={styles.total}>
          Total do pedido: R$ {calcularTotal().toFixed(2)}
        </Text>
      )}
      
      {itens.length > 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={enviarPedido}
        >
          <Text style={styles.buttonText}>
            Enviar Pedido
          </Text>
        </TouchableOpacity>
      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:30,
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
    fontWeight:"bold",
    textAlign:"center"
  },

  catalogo:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:8,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:8
  },

  catalogoTexto:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  },

  total:{
    fontSize:18,
    fontWeight:"bold",
    textAlign:"center",
    marginTop:15,
    color:"#333"
  },

  button:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:8,
    alignItems:"center",
    marginTop:20,
    marginBottom:20
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  },
  
  itemContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:5,
    marginTop:3,
    padding:10,
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:6
  },

  itemTexto:{
    fontSize:16
  },

  removerBotao:{
    backgroundColor:"#f8f8f8",
    padding:8,
    borderRadius:6,
    justifyContent:"center",
    alignItems:"center"
  },

});