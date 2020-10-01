import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';

const Formulario = ( { busqueda, guardarBusqueda, guardarConsultar } ) => {

    //Extrayendo ciudad y pais desde el useState de la app principal
    const { pais, ciudad } = busqueda;

    //Definimos el state para la animacion...el Value(1) es el valor inicial de la escala
    const [animacionboton ] = useState (new Animated.Value(1));

    //Habilitamos o no la busqueda en base a los datos ingresados por el usuario
    const consultarClima = () => {
        //Validamos que los datos ingresados por el usuario sean correctos  
        if (pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }

        //Actualizamos el state para habilitar la busqueda
        guardarConsultar(true);
    
     }

   //Mostramos una alerta para el caso de los datos ingresados por el usuario no sean validos
   const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Agrega un pais y una ciudad para la busqueda',
            [
                { text: 'Entendido' }
            ]
        )

    }

    //Animacion que se ejecuta al presionar el boton de busqueda
    const animacionEntrada = () => {
        //console.log('Animacion entrada...');
        Animated.spring(animacionboton, {
            toValue: 0.75, //Al ser menor al value inicial el boton se achica...por ende, si el valor fuera mayor se agrandaria
            useNativeDriver: true
        }).start();        
    }

    //Animacion que se ejecuta al soltar el boton de busqueda    
    const animacionSalida = () => {
        //console.log('Animacion salida...');
        Animated.spring(animacionboton, {
            toValue: 1, //vuelve al estado de escala anterior(el cual definimos como Value(1) anteriormente)
            friction: 4, //a menor valor mayor es el efecto de rebote de la animacion
            tension: 30, //a menor numero mas suave es el movimiento
            useNativeDriver: true            
        }).start();          
    }

    const estiloAnimacion = {
        transform: [ { scale: animacionboton } ]
    }

    return (
    <>
        <View>
            <View style={styles.formulario}> 
                <TextInput style={styles.input}
                    value={ciudad}
                    onChangeText={ ciudad => guardarBusqueda( { ...busqueda, ciudad } ) }
                    placeholder='Ciudad'
                    placeholderTextColor='#666'
                />
            </View>
            <View>
                <Picker itemStyle={ {height: 120, backgroundColor: '#FFF'} } 
                    selectedValue={pais}
                    onValueChange={ pais => guardarBusqueda( { ...busqueda, pais } ) }
                >
                    <Picker.Item label='-- Seleccione un pais --' value='' />
                    <Picker.Item label='Estados Unidos' value='US' />
                    <Picker.Item label='Mexico' value='MX' />
                    <Picker.Item label='Argentina' value='AR' />
                    <Picker.Item label='Colombia' value='CO' />
                    <Picker.Item label='Costa Rica' value='CR' />
                    <Picker.Item label='España' value='ES' />
                    <Picker.Item label='Peru' value='PE' />                                                            
                </Picker>                
            </View>

            <TouchableWithoutFeedback
                onPressIn={ () => animacionEntrada() }
                onPressOut={ () => animacionSalida() }
                onPress={ () => consultarClima() }
            >
                <Animated.View style={ [styles.btnBuscar, estiloAnimacion] } >
                    <Text style={styles.textoBuscar}>Buscar Clima</Text>
                </Animated.View>

            </TouchableWithoutFeedback>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
    formulario: {
        marginTop: 100
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
});

export default Formulario;
