import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert, Image, ImageBackground,
  StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from 'react-native';


export default function AddTaskScreen() {
    const [taskName,setTaskName]=useState("");
    const [taskDescription,setDescription]=useState("");
    
    const saveTask=async()=>{
        if(!taskDescription||!taskName){
            Alert.alert('Eroor','Please fill in all fields');
            return;
        }
  
        try{
            const existingTasks=await AsyncStorage.getItem('tasks');
            let tasksArray=existingTasks?JSON.parse(existingTasks):[];

            const newTask={id:Date.now().toString(),taskName,taskDescription};
            tasksArray.push(newTask);

            await AsyncStorage.setItem('tasks',JSON.stringify(tasksArray));

            await Notifications.scheduleNotificationAsync({
                content:{
                    title:'Task Saced Successfully',
                    body:'Don\'t forget to complete your ${taskName} !',
                },
                trigger:null,
            });
            router.back();
        }
        catch (error)
        {
            console.error('Failed to Save task',error)
        };
            
    };

    return(
         <ImageBackground
      source={{ uri: 'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80' }}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.3 }}
    >
         <View style={styles.container}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg' }}
          style={styles.banner}
        />

        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />

         <Text style={styles.label}>Task Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          value={taskDescription}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
         <TouchableOpacity style={styles.button} onPress={saveTask}>
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    )
  
    }

    
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  banner: {
    width: '100%', height: 180, borderRadius: 12,
    marginBottom: 20, resizeMode: 'cover',
  },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: 'white', borderRadius: 8, padding: 12,
    borderWidth: 1, borderColor: '#ddd',
  },
  textArea: { height: 100 },
  button: {
    backgroundColor: 'green', padding: 15, borderRadius: 8,
    alignItems: 'center', marginTop: 'auto',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});