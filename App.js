import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Formulario from './components/Formulario';

const App = () => {

  //Ocultamos el teclado cuando tocamos fuera del input
  const cerrarTeclado = () => {
    Keyboard.dismiss()
  } 

  return (
    <>
      <TouchableWithoutFeedback onPress={ () => cerrarTeclado() } > 

        <View style={styles.app}>

          <View style={styles.contenido}>

            <Formulario />  

          </View>

        </View>

      </TouchableWithoutFeedback> 

    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71, 149, 212)',
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }

});

export default App;
