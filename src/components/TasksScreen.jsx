import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Importa los iconos de Expo

const COLORS = { primary: '#1f145c', white: '#fff' };

const TasksScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Función para cargar las tareas almacenadas al iniciar la aplicación
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks', error);
      }
    };
    loadTasks();
  }, []);

  // Función para guardar las tareas cuando se actualiza el estado 'tasks'
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: task }]);
      setTask('');
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => openModal(item)}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: COLORS.primary }}>{item.title}</Text>
      </View>
      <TouchableOpacity style={[styles.actionIcon, { backgroundColor: 'green' }]} >
        <Ionicons name='checkmark' color={COLORS.white}></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionIcon, { backgroundColor: 'red' }]} >
        <Ionicons name='trash' color={COLORS.white}></Ionicons>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Create new task"
            value={task}
            onChangeText={(text) => setTask(text)}
          />
        </View>
        <TouchableOpacity onPress={addTask} style={{}}>
          <View style={styles.iconContainer}>
            <Ionicons name="add" color={COLORS.white} size={30} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {selectedTask && (
                <View>
                  <View style={styles.modalContent}>
                    <Text>{selectedTask.title}</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 10, width: 'auto', justifyContent: 'left' }}>
                      <Ionicons name="notifications-outline" size={18} />
                      <Text>Remember Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 10, width: 'auto', justifyContent: 'left' }}>
                      <Ionicons name="calendar" size={18} />
                      <Text>Due Date</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalActions}>
                    <TouchableOpacity onPress={closeModal} style={{ backgroundColor: 'red', borderRadius: 7, padding: 5, }}>
                      <Text style={{color: COLORS.white, fontWeight: 'bold'}}>Cerrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    margin: 10,
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 5,
    borderRadius: 7,
    marginVertical: 10,
  },

  actionIcon: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 300, // Ancho máximo del modal
  },

  modalContent: {
    marginBottom: 15,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  }
});

export default TasksScreen;
