import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.headerConatiner}>
      <Text style={styles.headerTile}>Sticky Notes</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerConatiner:{
        width:"100%",
        height:"13%",
        backgroundColor: Platform.OS == "android" ? "purple" : "yellow",
        paddingTop: 30,
        paddingLeft: 90,
        alignContent: 'center',
        textAlign:'center',
        },
        headerTile:{
            color: Platform.OS === "android" ? "white" : "purple",
            fontSize: 30,
            fontWeight: 'bold',
            padding: 10,
            marginTop: 10,
            alignContent: "center",
            alignItems: 'center',
            

        },
})