import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../services/supabase';

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Seleccionar de Galería con solicitud de permisos
  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se requieren permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Capturar con Cámara con solicitud de permisos
  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se requieren permisos para utilizar la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Eliminar fotografía de la vista previa
  const removeImage = () => {
    setImageUri(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Fotografías</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewContainer}>
        {imageUri ? (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={removeImage}>
              <Text style={styles.deleteButtonText}>Eliminar Fotografía</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No hay ninguna fotografía seleccionada</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
          <Text style={styles.actionButtonText}>Seleccionar de Galería</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.cameraButton]} onPress={takePhotoWithCamera}>
          <Text style={styles.actionButtonText}>Tomar Fotografía</Text>
        </TouchableOpacity>
        
        {imageUri && (
          <TouchableOpacity style={[styles.actionButton, styles.changeButton]} onPress={pickImageFromGallery}>
            <Text style={styles.actionButtonText}>Cambiar Fotografía</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'space-between' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  logoutButton: { backgroundColor: '#ff3b30', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  placeholder: { width: '100%', height: 300, borderWidth: 2, borderColor: '#ccc', borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' },
  placeholderText: { color: '#888', fontSize: 16 },
  imageWrapper: { width: '100%', alignItems: 'center' },
  image: { width: '100%', height: 320, borderRadius: 12, marginBottom: 12 },
  deleteButton: { backgroundColor: '#ff9500', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  actionsContainer: { width: '100%', paddingBottom: 20 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  cameraButton: { backgroundColor: '#34C759' },
  changeButton: { backgroundColor: '#5856D6' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});