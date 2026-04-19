import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PedidoCard({ pedido }) {

  function calcularTotal(){
    return pedido.itens.reduce((total, item) => {
      return total + (item.quantidade * (item.preco || 0));
    }, 0);
  }

  return (
    <View style={styles.card}>

      <Text style={styles.cliente}>
        Cliente: {pedido.cliente}
      </Text>

      {pedido.tipoCriador === "admin" && (
        <Text style={styles.adm}>
          Criado por: {pedido.criadoPor} ({pedido.tipoCriador})
        </Text>
      )}

      {pedido.itens.map((produto, index) => (
        <Text key={index} style={styles.item}>
          • {produto.nome} ({produto.tamanho}) x{produto.quantidade}
          {" - R$ "}
          {(produto.quantidade * (produto.preco || 0)).toFixed(2)}
        </Text>
      ))}

      <Text style={styles.id}>
        Pedido: {pedido.id}
      </Text>

      <Text style={styles.total}>
        Total: R$ {calcularTotal().toFixed(2)}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
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

  adm:{
    fontSize:14,
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
    marginTop:5,
    fontSize:12,
    color:"gray"
  }
});