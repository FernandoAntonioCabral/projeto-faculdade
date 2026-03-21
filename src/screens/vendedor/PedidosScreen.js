import GrupoPedidos from "../../components/GrupoPedidos";
import React, { useState, useEffect, useCallback } from "react";
import { adicionarTotalPedido, totalPorCliente } from '../../utils/PedidosController';
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";

import { getPedidos } from "../../services/storage";

export default function PedidosScreen(){

  const [pedidosAgrupados,setPedidosAgrupados] = useState({});
  
  useFocusEffect(
    useCallback(() => {
      carregarPedidos();
    }, [])
  );

  async function carregarPedidos(){
    const data = await getPedidos();

    if(!data || data.length === 0){
      setPedidosAgrupados({});
      return;
    }

    const pedidosComTotal = adicionarTotalPedido(data);
    const agrupados = agruparPorData(pedidosComTotal);

    setPedidosAgrupados({...agrupados});
  }

  function formatarData(timestamp){

    if(!timestamp) return "Sem data";

    const data = new Date(timestamp);

    return data.toLocaleDateString("pt-BR");

  }

  function agruparPorData(pedidos){

    const grupos = {};

    pedidos.forEach(p => {

      if(!p.data){
        return;
      }

      const dataFormatada = formatarData(p.data);

      if(!grupos[dataFormatada]){
        grupos[dataFormatada] = [];
      }

      grupos[dataFormatada].push(p);

    });

    return grupos;
  }

  return(

    <View style={styles.container}>

      <View style={styles.header}>
        <Ionicons name="clipboard-outline" size={24}/>
        <Text style={styles.title}>
          Pedidos Recebidos
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
    padding:20,
    backgroundColor:"#f5f6fa"
  },

  header:{
    flexDirection:"row",
    alignItems:"center",
    gap:8,
    marginBottom:20
  },

  title:{
    fontSize:24,
    fontWeight:"bold"
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

  cliente:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:10,
    color:"#333"
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
    marginTop:10,
    fontSize:12,
    color:"gray"
  }

});