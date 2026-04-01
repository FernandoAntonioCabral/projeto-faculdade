import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { produtos } from "../../services/produtos";

export default function CatalogoScreen({ navigation, route }) {

  const { adicionarProduto } = route.params;

  const [produtoSelecionado,setProdutoSelecionado] = useState(null);
  const [tamanhoSelecionado,setTamanhoSelecionado] = useState(null);
  const [quantidade,setQuantidade] = useState(1);

  function selecionarProduto(produto){
    setProdutoSelecionado(produto.id);
    setTamanhoSelecionado(null);
    setQuantidade(1);
  }

  function selecionarTamanho(tamanho){
    setTamanhoSelecionado(tamanho);
  }

  function aumentar(){
    setQuantidade(quantidade + 1);
  }

  function diminuir(){
    if(quantidade > 1){
      setQuantidade(quantidade - 1);
    }
  }

  function adicionar(produto){

    adicionarProduto({
      nome: produto.nome,
      tamanho: tamanhoSelecionado.tamanho,
      preco: tamanhoSelecionado.preco,
      quantidade: quantidade
    });

    navigation.goBack();

  }

  function renderProduto({item}){

    const aberto = produtoSelecionado === item.id;

    return(

      <View style={styles.card}>

        <TouchableOpacity
          onPress={()=>selecionarProduto(item)}
        >
          <Text style={styles.nome}>{item.nome}</Text>
        </TouchableOpacity>

        {aberto && item.tamanhos.map((t,index)=>(

          <TouchableOpacity
            key={index}
            style={styles.opcao}
            onPress={()=>selecionarTamanho(t)}
          >
            <Text>
              {t.tamanho} - R$ {t.preco}
            </Text>
          </TouchableOpacity>

        ))}

        {aberto && tamanhoSelecionado && (

          <View style={styles.quantidadeContainer}>

            <Text style={styles.quantidadeTitulo}>
              Quantidade
            </Text>

            <View style={styles.controle}>

              <TouchableOpacity
                style={styles.botaoQtd}
                onPress={diminuir}
              >
                <Text>-</Text>
              </TouchableOpacity>

              <Text style={styles.numero}>
                {quantidade}
              </Text>

              <TouchableOpacity
                style={styles.botaoQtd}
                onPress={aumentar}
              >
                <Text>+</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={()=>adicionar(item)}
            >
              <Text style={styles.textoAdicionar}>
                Adicionar ao pedido
              </Text>
            </TouchableOpacity>

          </View>

        )}

      </View>

    )

  }

  return(

    <View style={styles.container}>

      <View style={styles.header}>
        <Ionicons name="grid-outline" size={24} color="#fff" />
        <Text style={styles.title}> Catálogo </Text>
      </View>

      <FlatList 
        style={styles.flat}
        data={produtos}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={renderProduto}
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff"
  },

  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:8,
    marginBottom:20
  },

  flat:{
    color:"#8a0a0a"
  },

  title:{
    fontSize:24,
    fontWeight:"bold",
    textAlign:"center",
  },

  card:{
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"#e5e5e5",
    padding:15,
    borderRadius:10,
    marginBottom:15
  },

  nome:{
    fontSize:18,
    fontWeight:"bold",
    color:"#333"
  },

  opcao:{
    marginTop:10,
    padding:10,
    backgroundColor:"#f5f5f5",
    borderRadius:8
  },

  quantidadeContainer:{
    marginTop:15
  },

  quantidadeTitulo:{
    fontWeight:"bold",
    marginBottom:10,
    color:"#333"
  },

  controle:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:15
  },

  botaoQtd:{
    backgroundColor:"#2f80ed",
    width:40,
    height:40,
    borderRadius:8,
    alignItems:"center",
    justifyContent:"center"
  },

  numero:{
    marginHorizontal:20,
    fontSize:18,
    fontWeight:"bold"
  },

  botaoAdicionar:{
    backgroundColor:"#2f80ed",
    padding:12,
    borderRadius:8,
    alignItems:"center"
  },

  textoAdicionar:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  }

});
