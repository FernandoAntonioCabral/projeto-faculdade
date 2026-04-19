import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VendedorDashboard from "../screens/vendedor/VendedorDashboard";
import PedidosScreen from "../screens/vendedor/PedidosScreen";
import PedidoScreen from "../screens/cliente/PedidoScreen";
import CatalogoScreen from "../screens/cliente/CatalogoScreen";
import CaixaScreen from "../screens/vendedor/CaixaScreen";
import NovoMovimentoScreen from "../screens/vendedor/NovoMovimentoScreen";
import CadastroScreen from "../screens/cadastro/CadastroScreen";

const Stack = createNativeStackNavigator();

export default function VendedorNavigator({ setUser }) {

  return (

    <Stack.Navigator>

      <Stack.Screen name="Dashboard">
        {(props) => <VendedorDashboard {...props} setUser={setUser} />}
      </Stack.Screen>

      <Stack.Screen name="Pedidos" component={PedidosScreen} />

      <Stack.Screen name="Pedido" component={PedidoScreen} />

      <Stack.Screen name="Catalogo" component={CatalogoScreen} />

      <Stack.Screen name="Cadastro" component={CadastroScreen} />

      <Stack.Screen name="Caixa" component={CaixaScreen} />

      <Stack.Screen name="NovoMovimento" component={NovoMovimentoScreen} />

    </Stack.Navigator>

  );

}