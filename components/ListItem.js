import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListItem = ({note}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.noteText}>{note}</Text>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
    listItem:{
        borderWidth:4,
        borderColor: "black",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f5f5f5",
        marginTop: 10,

    },
    noteText:{
        fontSize:15,
        fontWeight: "400",
        
    },
})