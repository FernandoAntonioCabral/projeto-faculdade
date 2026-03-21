import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import CadastroScreen from "../screens/cadastro/CadastroScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ setUser }){

  return(
    <Stack.Navigator>

      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setUser={setUser} />}
      </Stack.Screen>

      <Stack.Screen name="Cadastro" component={CadastroScreen} />

    </Stack.Navigator>
  )

}