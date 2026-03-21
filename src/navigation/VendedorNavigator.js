import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import VendedorDashboard from "../screens/vendedor/VendedorDashboard";
import PedidosScreen from "../screens/vendedor/PedidosScreen";

const Stack = createNativeStackNavigator();

export default function VendedorNavigator({ setUser }) {

  return (

    <Stack.Navigator>

      <Stack.Screen name="Dashboard">
        {(props) => <VendedorDashboard {...props} setUser={setUser} />}
      </Stack.Screen>

      <Stack.Screen name="Pedidos" component={PedidosScreen} />

    </Stack.Navigator>

  );

}