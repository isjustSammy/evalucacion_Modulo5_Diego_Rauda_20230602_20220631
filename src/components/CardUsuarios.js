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
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>Editar Información</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={datosEditados.nombre}
              onChangeText={(text) => setDatosEditados({ ...datosEditados, nombre: text })}
              placeholder="Ingresa el nombre completo"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={datosEditados.correo}
              onChangeText={(text) => setDatosEditados({ ...datosEditados, correo: text })}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Título universitario</Text>
            <TextInput
              style={styles.input}
              value={datosEditados.titulo}
              onChangeText={(text) => setDatosEditados({ ...datosEditados, titulo: text })}
              placeholder="Ej: Licenciatura en Ingeniería"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Año de graduación</Text>
            <TextInput
              style={styles.input}
              value={datosEditados.anioGraduacion}
              onChangeText={(text) => setDatosEditados({ ...datosEditados, anioGraduacion: text })}
              placeholder="2024"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.saveButtonText}>✓ Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>✕ Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{nombre ? nombre.charAt(0).toUpperCase() : 'U'}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.nombre}>{nombre}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Graduado {anioGraduacion}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📧</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoText}>{correo}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🎓</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Título</Text>
                <Text style={styles.infoText}>{titulo}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>📅</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Graduación</Text>
                <Text style={styles.infoText}>{anioGraduacion}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setEditMode(true)}>
              <Text style={styles.editButtonText}>✏️ Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  viewContainer: {
    padding: 24,
  },
  editContainer: {
    padding: 24,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerInfo: {
    flex: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  badge: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0ea5e9',
    letterSpacing: 0.5,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  icon: {
    fontSize: 18,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    letterSpacing: 0.2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#f9fafb',
    fontWeight: '500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  cancelButton: {
    backgroundColor: '#6b7280',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});