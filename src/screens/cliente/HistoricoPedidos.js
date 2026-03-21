import GrupoPedidos from "../../components/GrupoPedidos";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { getPedidos } from "../../services/storage";
import { getUser } from "../../services/authService";

export default function HistoricoPedidos(){

  const [pedidosAgrupados,setPedidosAgrupados] = useState({});

  useEffect(()=>{
    carregarPedidos();
  },[]);

  async function carregarPedidos(){

    const user = await getUser();
    const data = await getPedidos();

    const meusPedidos = data.filter(
      p => p.cliente  === user.nome
    );

    const agrupados = agruparPorData(meusPedidos);
    setPedidosAgrupados(agrupados);

  }

  function formatarData(timestamp){
    if(!timestamp) return "Sem data";

    const data = new Date(timestamp);
    return data.toLocaleDateString("pt-BR");
  }

  function agruparPorData(pedidos){
    const grupos = {};

    pedidos.forEach(p => {

      const dataFormatada = formatarData(p.data);

      if(!grupos[dataFormatada]){
        grupos[dataFormatada] = [];
      }

      grupos[dataFormatada].push(p);

    });

    return grupos;
  }

  function calcularTotalPedido(pedido){
    return pedido.itens.reduce((total, item) => {
      const preco = item.preco || 0;
      return total + (item.quantidade * preco);
    }, 0);
  }

  function renderPedido({item}){

  return(

    <View style={styles.card}>
      
      {item.itens.map((produto,index)=>(

        <Text key={index} style={styles.item}>
         • {produto.nome} ({produto.tamanho}) - Qtd: {produto.quantidade}
        </Text>
        
      ))}

      <Text style={styles.id}>
        Pedido: {item.id}
      </Text>

      <Text style={styles.total}>
        Total: R$ {calcularTotalPedido(item).toFixed(2)}
      </Text>

    </View>

  )

  }

  return(

    <View style={styles.container}>

      <View style={styles.header}>

        <Ionicons name="receipt-outline" size={24} />

        <Text style={styles.title}>
          Meus Pedidos
        </Text>

      </View>

      <ScrollView>

        {Object.entries(pedidosAgrupados).map(([data, pedidos]) => (
          <GrupoPedidos key={data} data={data} pedidos={pedidos} />
        ))}

      </ScrollView>

    </View>

  )

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20
  },
  
  header:{
    flexDirection:"row",
    alignItems:"center",
    gap:8,
    marginBottom:20
  },

  grupo:{
    marginBottom:20
  },

  dataTitulo:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:10,
    color:"#2f80ed"
  },

  title:{
    fontSize:24,
    fontWeight:"bold"
  },

  card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    shadowColor:"#000",
    shadowOpacity:0.1,
    shadowRadius:5,
    elevation:3
  },

  item:{
    fontSize:15,
    marginBottom:5,
    color:"#555"
  },

  total:{
    marginTop:10,
    fontSize:16,
    fontWeight:"bold",
    color:"#27ae60"
  },

  id:{
    fontSize:12,
    marginTop:5,
    color:"gray"
  }

});