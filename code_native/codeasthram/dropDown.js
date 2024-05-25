import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ModuleDropdown = ({ modulesData, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    onSelect(index);
    setSelectedIndex(index);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownSelect} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownSelectText}>
          {selectedIndex !== null ? modulesData[selectedIndex].name : "Select a module"}
        </Text>
        <FontAwesome name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {modulesData.map((module, index) => (
            <TouchableOpacity key={index} style={styles.dropdownOption} onPress={() => handleSelect(index)}>
              <Text>{module.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ProjectDropdown = ({ projectsData, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    if (projectsData && index >= 0 && index < projectsData.length) {
      onSelect(projectsData[index]);
      setSelectedIndex(index);
    }
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownSelect} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownSelectText}>
          {selectedIndex != null && projectsData && selectedIndex < projectsData.length
            ? projectsData[selectedIndex].name
            : "Select a project"}
        </Text>
        <FontAwesome name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownOptions}>
          {projectsData.map((project, index) => (
            <TouchableOpacity key={index} style={styles.dropdownOption} onPress={() => handleSelect(index)}>
              <Text>{project.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export { ModuleDropdown, ProjectDropdown };

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    zIndex: 100,
  },
  dropdownSelect: {
    width: 200,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dropdownSelectText: {
    flexGrow: 1,
    marginRight: 10,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  dropdownOptions: {
    position: 'absolute',
    top: 45,
    left: 0,
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1000,
  },
  dropdownOption: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dropdownOptionText: {
    color: '#333',
  },
});
