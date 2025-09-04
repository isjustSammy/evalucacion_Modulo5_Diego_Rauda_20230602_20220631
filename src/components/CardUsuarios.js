import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { database } from '../config/Firebase';

const CardUsuarios = ({ id, nombre, correo, titulo, anioGraduacion }) => {
  const [editMode, setEditMode] = useState(false);
  const [datosEditados, setDatosEditados] = useState({
    nombre: nombre || '',
    correo: correo || '',
    titulo: titulo || '',
    anioGraduacion: anioGraduacion ? anioGraduacion.toString() : '',
  });

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(database, 'usuarios', id));
      Alert.alert('Usuario eliminado', `Se eliminó el usuario ${nombre}`);
    } catch (e) {
      console.error('Error al eliminar el usuario:', e);
      Alert.alert('Error', 'No se pudo eliminar el usuario.');
    }
  };

  const handleSave = async () => {
    if (
      !datosEditados.nombre.trim() ||
      !datosEditados.correo.trim() ||
      !datosEditados.titulo.trim() ||
      !datosEditados.anioGraduacion.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const anio = parseInt(datosEditados.anioGraduacion);
    if (isNaN(anio) || anio < 1900 || anio > new Date().getFullYear() + 5) {
      Alert.alert('Error', 'Ingresa un año de graduación válido');
      return;
    }

    try {
      await updateDoc(doc(database, 'usuarios', id), {
        nombre: datosEditados.nombre,
        correo: datosEditados.correo,
        titulo: datosEditados.titulo,
        anioGraduacion: anio,
      });
      Alert.alert('Actualización exitosa', 'Usuario actualizado correctamente');
      setEditMode(false);
    } catch (e) {
      console.error('Error al actualizar el usuario:', e);
      Alert.alert('Error', 'No se pudo actualizar el usuario.');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setDatosEditados({
      nombre: nombre || '',
      correo: correo || '',
      titulo: titulo || '',
      anioGraduacion: anioGraduacion ? anioGraduacion.toString() : '',
    });
  };

  return (
    <View style={styles.card}>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={datosEditados.nombre}
            onChangeText={(text) => setDatosEditados({ ...datosEditados, nombre: text })}
            placeholder="Nombre"
          />
          <TextInput
            style={styles.input}
            value={datosEditados.correo}
            onChangeText={(text) => setDatosEditados({ ...datosEditados, correo: text })}
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={datosEditados.titulo}
            onChangeText={(text) => setDatosEditados({ ...datosEditados, titulo: text })}
            placeholder="Título"
          />
          <TextInput
            style={styles.input}
            value={datosEditados.anioGraduacion}
            onChangeText={(text) => setDatosEditados({ ...datosEditados, anioGraduacion: text })}
            placeholder="Año de Graduación"
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.updateButton, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.updateButtonText}>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.updateButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.updateButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.text}>📧 {correo}</Text>
          <Text style={styles.text}>🎓 {titulo}</Text>
          <Text style={styles.text}>📅 Año de Graduación: {anioGraduacion}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.updateButton, styles.editButton]}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.updateButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  updateButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#0288d1',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CardUsuarios;
