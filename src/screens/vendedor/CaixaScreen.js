import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useRef , useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated
} from "react-native";

import { getMovimentos } from "../../services/caixaService";

export default function CaixaScreen({ navigation }){

  const [movimentos, setMovimentos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [mostrarInicio, setMostrarInicio] = useState(false);
  const [mostrarFim, setMostrarFim] = useState(false);
  const [aberto, setAberto] = useState(false);
  const alturaAnimada = useRef(new Animated.Value(0)).current;
  const movimentosFiltrados = filtrarMovimentos(movimentos);
  const total = calcularTotal(movimentosFiltrados);
  const movimentosAgrupados = agruparPorData(movimentosFiltrados);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  async function carregar(){
    const data = await getMovimentos();
    setMovimentos(data);
  }

  function calcularTotal(lista){

    return lista.reduce((total, item) => {

      if(item.tipo === "entrada"){
        return total + item.valor;
      } else {
        return total - item.valor;
      }

    }, 0);

  }

  function formatarData(timestamp){
    if(!timestamp) return "Sem data";

    const data = new Date(timestamp);
    return data.toLocaleDateString("pt-BR");
  }

  function agruparPorData(lista){

    const grupos = {};

    lista.forEach(m => {

      const dataFormatada = formatarData(m.data);

      if(!grupos[dataFormatada]){
        grupos[dataFormatada] = [];
      }

      grupos[dataFormatada].push(m);

    });

    return grupos;
  }

  function getLabelFiltro(){
    if(dataInicio && dataFim){
      return `${formatarData(dataInicio)} até ${formatarData(dataFim)}`;
    }
    return `${filtroTipo} - ${filtroPeriodo}`;
  }

  function filtrarMovimentos(lista){

    return lista.filter(item => {

      const dataItem = new Date(item.data);

      if(filtroTipo !== "todos" && item.tipo !== filtroTipo){
        return false;
      }

      if(filtroPeriodo !== "todos"){

        const hoje = new Date();

        if(filtroPeriodo === "hoje"){
          return dataItem.toDateString() === hoje.toDateString();
        }

        if(filtroPeriodo === "semana"){
          const seteDias = 7 * 24 * 60 * 60 * 1000;
          return (hoje - dataItem) <= seteDias;
        }

        if(filtroPeriodo === "mes"){
          return (
            dataItem.getMonth() === hoje.getMonth() &&
            dataItem.getFullYear() === hoje.getFullYear()
          );
        }
      }

      if(dataInicio && dataFim){
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);

        // zera hora pra evitar bug
        inicio.setHours(0,0,0,0);
        fim.setHours(23,59,59,999);

        if(dataItem < inicio || dataItem > fim){
          return false;
        }
      }

      return true;
    });
  }

  function toggleDropdown(){

    if(aberto){
      Animated.timing(alturaAnimada, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(alturaAnimada, {
        toValue: 320,
        duration: 300,
        useNativeDriver: false
      }).start();
    }

    setAberto(!aberto);
  }

  function renderItem({item}){

    return(
      <View style={styles.linha}>

        <Text style={styles.tipo}>
          {item.tipo === "entrada" ? "💰" : "💸"}
        </Text>

        <View style={{flex:1}}>
          <Text>{item.descricao}</Text>
          <Text style={styles.obs}>{item.observacao}</Text>
        </View>

        <Text style={{
          color: item.tipo === "entrada" ? "green" : "red"
        }}>
          R$ {item.valor}
        </Text>

      </View>
    )
  }

  return(

    <View style={styles.container}>

      <View style={styles.header}>
        <Ionicons name="cash-outline" size={24} color="#fff" />
        <Text style={styles.title}> Controle de Caixa </Text>
      </View>

      <TouchableOpacity
        style={styles.combo}
        onPress={toggleDropdown}
      >
        <Text style={styles.comboTexto}>
          Filtro: {getLabelFiltro()} ▼
        </Text>

        <TouchableOpacity
          onPress={() => {
            setDataInicio(null);
            setDataFim(null);
            setFiltroTipo("todos");
            setFiltroPeriodo("todos");
          }}
        >
          <Text style={{color:"gray", fontWeight:"bold"}}>
            Limpar filtros
          </Text>
        </TouchableOpacity>

      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdown,
          {
            height: alturaAnimada,
            opacity: alturaAnimada.interpolate({
              inputRange: [0, 200],
              outputRange: [0, 1]
            })
          }
        ]}
      >

        <Text style={styles.titulo}>Tipo</Text>

        <TouchableOpacity onPress={() => {
          setFiltroTipo("todos");
          toggleDropdown();
        }}>
          <Text>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setFiltroTipo("entrada");
          toggleDropdown();
        }}>
          <Text>Entradas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setFiltroTipo("saida");
          toggleDropdown();
        }}>
          <Text>Saídas</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Período</Text>

        <TouchableOpacity onPress={() => {
          setFiltroPeriodo("hoje");
          toggleDropdown();
        }}>
          <Text>Hoje</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setFiltroPeriodo("semana");
          toggleDropdown();
        }}>
          <Text>Semana</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setFiltroPeriodo("mes");
          toggleDropdown();
        }}>
          <Text>Mês</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Intervalo</Text>

          <TouchableOpacity
            style={styles.botaoData}
            onPress={() => setMostrarInicio(true)}
          >
            <Text>
              De: {
                dataInicio
                  ? new Date(dataInicio).toLocaleDateString("pt-BR")
                  : "Selecionar"
              }
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoData}
            onPress={() => setMostrarFim(true)}
          >
            <Text>
              Até: {dataFim ? dataFim.toLocaleDateString("pt-BR") : "Selecionar"}
            </Text>
          </TouchableOpacity>

      </Animated.View>

      <ScrollView>

        {Object.entries(movimentosAgrupados).map(([data, lista]) => (

          <View key={data} style={styles.grupo}>

            <Text style={styles.dataTitulo}>
              📅 {data}
            </Text>

            {lista.map((item) => (

              <View key={item.id} style={styles.linha}>

                <Text style={styles.tipo}>
                  {item.tipo === "entrada" ? "💰" : "💸"}
                </Text>

                <View style={{flex:1}}>
                  <Text>{item.descricao}</Text>
                  <Text style={styles.obs}>{item.observacao}</Text>
                </View>

                <Text style={{
                  color: item.tipo === "entrada" ? "green" : "red"
                }}>
                  R$ {item.valor}
                </Text>

              </View>

            ))}

          </View>

        ))}

      </ScrollView>
        
      <View style={styles.totalBox}>
        <Text style={styles.totalTexto}>
          Total: R$ {total}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("NovoMovimento")}>
        <Text style={styles.buttonText}>
          Adicionar Movimentação
        </Text>
      </TouchableOpacity>

      {mostrarInicio && (
        <DateTimePicker
          value={dataInicio || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarInicio(false);

            if(event.type !== "set") return;
            if(selectedDate){

              if(dataFim && selectedDate > dataFim){
                Alert.alert("Erro", "Data inicial não pode ser maior que a final");
                return;
              }
              setDataInicio(selectedDate);
              setFiltroPeriodo("todos"); // 🔥 evita conflito
            }
          }}
        />
      )}

      {mostrarFim && (
        <DateTimePicker
          value={dataFim || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarFim(false);

            if(event.type !== "set") return;
            if(selectedDate){

              if(dataInicio && selectedDate < dataInicio){
                Alert.alert("Erro", "Data final não pode ser menor que a inicial");
                return;
              }
              setDataFim(selectedDate);
              setFiltroPeriodo("todos"); // 🔥 evita conflito
              toggleDropdown();
            }
          }}
        />
      )}
        
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
    justifyContent:"center",
    gap:8,
    marginBottom:20
  },

  title:{
    fontSize:24,
    fontWeight:"bold"
  },

  button:{
    backgroundColor:"#2f80ed",
    padding:15,
    borderRadius:10,
    marginBottom:25,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    gap:8
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  },

  botaoData:{
    backgroundColor:"#f5f5f5",
    padding:10,
    borderRadius:8,
    marginBottom:8
  },

  linha:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:8,
    marginBottom:10,
    elevation:2
  },

  tipo:{
    fontSize:20,
    marginRight:10
  },

  obs:{
    fontSize:12,
    color:"gray"
  },
  
  resumo:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:15,
    elevation:2
  },

  entrada:{
    color:"green",
    fontWeight:"bold",
    marginBottom:5
  },

  saida:{
    color:"red",
    fontWeight:"bold",
    marginBottom:5
  },

  total:{
    fontWeight:"bold",
    fontSize:15
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

  combo:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:"#fff",
    padding:12,
    borderRadius:8,
    marginBottom:10,
    elevation:2
  },

  comboTexto:{
    fontWeight:"bold"
  },

  dropdown:{
    backgroundColor:"#fff",
    borderRadius:10,
    overflow:"hidden",
    marginBottom:10,
    paddingHorizontal:10
  },

  titulo:{
    fontWeight:"bold",
    marginTop:10,
    marginBottom:5
  },

  totalBox:{
    backgroundColor:"#fff",
    padding:15,
    borderWidth: 1,
    borderColor: "#ece3e3",
    borderRadius:10,
    marginBottom:10,
    alignItems:"center",
    elevation:2
  },

  totalTexto:{
    fontSize:15
  }

});