import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClienteHome from "../screens/cliente/ClienteHome";
import PedidoScreen from "../screens/cliente/PedidoScreen";
import HistoricoPedidos from "../screens/cliente/HistoricoPedidos";
import CatalogoScreen from "../screens/cliente/CatalogoScreen";

const Stack = createNativeStackNavigator();

export default function ClienteNavigator({ setUser }) {

  return (
    <Stack.Navigator>

      <Stack.Screen name="HomeCliente">
        {(props) => <ClienteHome {...props} setUser={setUser} />}
      </Stack.Screen>

      <Stack.Screen name="Pedido">
        {(props) => <PedidoScreen {...props} setUser={setUser} />}
      </Stack.Screen>

      <Stack.Screen name="Historico">
        {(props) => <HistoricoPedidos {...props} setUser={setUser} />}
      </Stack.Screen>

      <Stack.Screen name="Catalogo" component={CatalogoScreen} />

    </Stack.Navigator>
  );

}