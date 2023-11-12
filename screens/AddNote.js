import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { ScreenType } from '../constants/constants';

const AddNote = ({onSave, onExit}) => {
    const [enternedText, setEnteredText] = useState("");
    const handleChange = (val) =>{
        setEnteredText(val);
    };
    const handleClick = () => {
        // console.log(enternedText);
        if(enternedText.trim().length > 0){
            onSave(enternedText);
            onExit(ScreenType.allNotes);
        }
}
  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={styles.title}>AddNote</Text>
        <View>
            <TextInput onChangeText={handleChange}style={styles.input}/>
        </View>
        <Button onPress={handleClick} title="ADD"/>
        </View>
      
    </View>
  )
}

export default AddNote

const styles = StyleSheet.create({
    container:{
        flex:1,
    
    },
    formContainer:{
        backgroundColor: "#f5f5f5",
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
    },
    input:{
        marginVertical:10,
        width:'100%',
        borderBottomWidth: 4,
        fontSize: 16,
        padding:10,
    },

})