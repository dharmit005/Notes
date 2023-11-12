
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  Modal,
  TextInput,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import Header from "./components/Header";

const App = () => {
  const [clients, setClients] = useState([]);
  const [categories] = useState([
    'Goal Evidence',
    'Support Coordination',
    'Active Duty',
  ]);
  const [notes, setNotes] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [noteText, setNoteText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    loadClientsFromStorage();
    loadNotesFromStorage();
  }, []);

  const loadClientsFromStorage = async () => {
    try {
      const clientsData = await AsyncStorage.getItem('clients');
      if (clientsData !== null) {
        setClients(JSON.parse(clientsData));
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const loadNotesFromStorage = async () => {
    try {
      const notesData = await AsyncStorage.getItem('notes');
      if (notesData !== null) {
        setNotes(JSON.parse(notesData));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotesToStorage = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = () => {
    if (selectedClient !== '' && selectedCategory !== '' && noteText !== '') {
      const newNote = {
        client: selectedClient,
        category: selectedCategory,
        text: noteText,
      };
      setNotes([...notes, newNote]);
      saveNotesToStorage();
      setShowModal(false);
    }
  };
  const editNote = (index) => {
    setSelectedNoteIndex(index);
    setEditMode(true);
    const { client, category, text } = notes[index];
    setSelectedClient(client);
    setSelectedCategory(category);
    setNoteText(text);
    setShowModal(true);
  };

  const updateNote = () => {
    if (selectedClient !== '' && selectedCategory !== '' && noteText !== '') {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = {
        client: selectedClient,
        category: selectedCategory,
        text: noteText,
      };
      setNotes(updatedNotes);
      saveNotesToStorage();
      setShowModal(false);
      setEditMode(false);
      setSelectedNoteIndex(null);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotesToStorage();
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
       <Header />
       <View style={styles.buttonContainer}>
       <View style={styles.mainButton}>
      <Button title="Add New Note" color={"white"} onPress={() => setShowModal(true)} />
      </View>
      </View>
<View style={styles.mainContainer}>
      {notes.length === 0 ? (
        <Text style={styles.title}>No notes available</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <Text>Client: {item.client}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Note: {item.text}</Text>
              <Button title="Edit" onPress={() => editNote(index)} />
              <Button title="Delete" onPress={() => deleteNote(index)} />
            </View>
          )}
        />
      )}
      </View>
      

      <Modal visible={showModal} animationType="slide">
        <View style={{ margin: 30, paddingTop: 20 }}>
          <View style={{ padding:4,margin: 10 , borderColor:'black', borderWidth: 2}}>
        <TextInput
          placeholder="Enter client"
            mode="outlined"
            onChangeText={(text) => setSelectedClient(text)}
          />
          </View>
          <View style={{ padding:4,margin: 10 , borderColor:'black', borderWidth: 2, height: 200}}>
          <TextInput
            placeholder="Enter note text"
            multiline={true}
            onChangeText={(text) => setNoteText(text)}
          />
          </View>
          <Text>Choose a category:</Text>
          {categories.map((category) => (
            <View >
            <Button
            
              key={category}
              title={category}
              onPress={() => setSelectedCategory(category)}
            />
            </View>
          ))}

          <View style={styles.fixToText}>
          {editMode ? (
            <Button title="Update Note" onPress={updateNote} />
          ) : (
            <Button title="Add Note" onPress={addNote} />
          )}
          <Button title="Add Note" onPress={addNote} />
          <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    mainContainer:{
      flex:1,
      alignContent:'center',
      height: '100%',
      paddingTop: 40,
    },
    title:{
      flex:1,
      fontSize: 20,
      width: '100%',
      alignItems:'center',
      alignContent: 'center',

    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mainButton:{
      paddingHorizontal:20, 
      paddingVertical:10, 
      backgroundColor:'#5c5de5', 
      borderRadius:15, 
      elevation:5,
      shadowOffset:{width: 2, height:5},
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    buttonContainer:{
      width: "100%",
      paddingTop: 10,
      alignItems: 'center',
    },
  });
