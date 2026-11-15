import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
    Alert, Image, ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, View,
} from 'react-native';

export default function ProfileScreen() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('studentProfile');
      if (storedProfile) {
        const parsedData = JSON.parse(storedProfile);
        setStudentName(parsedData.name || '');
        setStudentId(parsedData.id || '');
        setProfileImage(parsedData.imageUri || null);
      }
    } catch (error) {
      console.error('Failed to load profile data', error);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required',
        "You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfileData = async () => {
    if (!studentName || !studentId) {
      Alert.alert('Error', 'Please enter both Name and Student ID.');
      return;
    }
    try {
      const profileData = {
        name: studentName,
        id: studentId,
        imageUri: profileImage,
      };
      await AsyncStorage.setItem('studentProfile', JSON.stringify(profileData));
      Alert.alert('Success', 'Profile details saved successfully!');
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      setStudentName('');
      setStudentId('');
      setProfileImage(null);
      Alert.alert('Success', 'All local data has been wiped.');
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Image
          source={{
            uri: profileImage
              ? profileImage
              : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.avatar}
        />
        <View style={styles.editBadge}>
          <Text style={styles.editBadgeText}>✎</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.heading}>Student Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={studentName}
        onChangeText={setStudentName}
      />

      <Text style={styles.label}>Student ID</Text>
      <TextInput
        style={styles.input}
        placeholder="CS/2020/001"
        value={studentId}
        onChangeText={setStudentId}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
        <Text style={styles.buttonText}>Save Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllData}>
        <Text style={styles.buttonText}>Clear All Tasks</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: 'white', flexGrow: 1 },
  imageContainer: { marginTop: 30, marginBottom: 10 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#cde' },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#007AFF', width: 30, height: 30,
    borderRadius: 15, justifyContent: 'center', alignItems: 'center',
  },
  editBadgeText: { color: 'white', fontSize: 14 },
  heading: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  label: { alignSelf: 'flex-start', fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  input: {
    width: '100%', backgroundColor: '#f5f5f5', borderRadius: 8,
    padding: 12, borderWidth: 1, borderColor: '#ddd',
  },
  saveButton: {
    width: '100%', backgroundColor: '#007AFF', padding: 15,
    borderRadius: 8, alignItems: 'center', marginTop: 20,
  },
  clearButton: {
    width: '100%', backgroundColor: 'red', padding: 15,
    borderRadius: 8, alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});