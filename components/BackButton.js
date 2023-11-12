import { Button, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { ScreenType } from '../constants/constants'

const BackButton = ({onButtonClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <TouchableOpacity onPress={()=>onButtonClick(ScreenType.home)}>
        <Button title= "< Back" color={"grey"}/>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default BackButton

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"flex-start",

    },
    button:{
margin: 10,
    },
})