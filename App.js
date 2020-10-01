import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Clima from './components/Clima';
import Formulario from './components/Formulario';

const App = () => {

  //Definimos el state para poder guardar el pais y la ciudad ingresada por el usuario
  const [busqueda, guardarBusqueda] = useState ({
    ciudad: '',
    pais: ''
  });

  //Extrayendo ciudad y pais desde el useState de la app principal
  const { pais, ciudad } = busqueda;

  //Definimos el stata para habilitar o no la busqueda
  const [consultar, guardarConsultar] = useState (false);
  //Definimos el state para guardar los datos del clima recibidos desde la API
  const [resultado, guardarResultado] = useState ({});
  //Definimos el state para guardar los datos del clima recibidos desde la API
  const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)');

  useEffect(() => {
    const consultarAPI = async () => {
      
      //console.log(consultar);

      if (consultar){

        const appId = '06876e1cdb8d20382c765b2ca169d238';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json()          
          //console.log(resultado);
          
          //Para actualizar el state con la respuesta de la API
          guardarResultado(resultado);

          //Actualizamos el state para deshabilitar la busqueda
          guardarConsultar(false);

          //Modificamos el fondo en base a la temperatura
          const kelvin = 273.15; //Constante de grados Kelvin
          const { main } = resultado; //Extraemos el main desde resultado
          const actual = main.temp - kelvin;
          //En base al valor de la temperatura actualizamos el state asignando el correspondiente color
          if (actual < 10) {
            guardarBgcolor('rgb(105, 108, 149)');     
          }
          else if (actual >= 10 && actual < 25) {
            guardarBgcolor('rgb(71, 149, 212)');
          }
          else {
            guardarBgcolor('rgb(178, 28, 61)');    
          }

        } 
        catch {
          mostrarAlerta();
        }

      } 
    }

    consultarAPI();

  }, [ consultar ])

  //Mostramos una alerta para el caso de los datos recibidos desde la API no sean validos
  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'No hay resultado, intenta con otro pais y ciudad',
      [
        { text: 'OK' }
      ]
   )

  }

  //Ocultamos el teclado cuando tocamos fuera del input
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  } 

  //Creamos un objeto para poder manipular dinamicamente el color de fondo en base a la temperatura
  const bgColorApp = {
    backgroundColor: bgcolor
  } 

  return (
    <>
      <TouchableWithoutFeedback onPress={ () => cerrarTeclado() } > 

        <View style={[ styles.app, bgColorApp ]}>

          <View style={styles.contenido}>

            <Clima 
              resultado={resultado}
            />

            <Formulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />  

          </View>

        </View>

      </TouchableWithoutFeedback> 

    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }

});

export default App;
