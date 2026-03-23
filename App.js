import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { criarAdminPadrao } from "./src/services/authService";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  
  useEffect(() => {
    criarAdminPadrao();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}