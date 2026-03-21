import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PedidoCard from "./PedidoCard";

export default function GrupoPedidos({ data, pedidos }) {

  return (
    <View style={styles.grupo}>

      <Text style={styles.dataTitulo}>
        📅 {data}
      </Text>

      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} />
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  grupo:{
    marginBottom:20
  },

  dataTitulo:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:10,
    color:"#2f80ed"
  }
});