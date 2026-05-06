import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import { api } from '../service/api';

type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
};

type Education = {
  id: string;
  institution: string;
  course: string;
};

export default function Sobre() {
  const [darkMode, setDarkMode] = useState(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  const theme = {
    background: darkMode ? '#0f172a' : '#f1f5f9',
    card: darkMode ? '#1e293b' : '#ffffff',
    text: darkMode ? '#ffffff' : '#1e293b',
    subtitle: darkMode ? '#a5b4fc' : '#4f46e5'
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const exp = await api.get('/experiences');
        const edu = await api.get('/educations');

        setExperiences(exp.data);
        setEducations(edu.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>

        <Text style={[styles.title, { color: theme.text }]}>
          📱 Sobre 
        </Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            🚀 Tecnologias Utilizadas no App
          </Text>

          <Text style={[styles.text, { color: theme.text }]}>• React Native</Text>
          <Text style={[styles.text, { color: theme.text }]}>• Expo</Text>
          <Text style={[styles.text, { color: theme.text }]}>• Expo Router</Text>
          <Text style={[styles.text, { color: theme.text }]}>• Axios</Text>
          <Text style={[styles.text, { color: theme.text }]}>• Node.js</Text>
          <Text style={[styles.text, { color: theme.text }]}>• Express</Text>
          <Text style={[styles.text, { color: theme.text }]}>• PostgreSQL</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            ⚙️ Funcionalidade Extra
          </Text>

          <Text style={[styles.text, { color: theme.text }]}>
            • Dark / Light Mode
          </Text>

          <View style={styles.switchContainer}>
            <Text style={{ color: theme.text }}>🌙 Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            🎓 Experiência Acadêmica
          </Text>

          {educations.map((item) => (
            <View key={item.id} style={{ marginBottom: 10 }}>
              <Text style={{ color: theme.subtitle }}>
                {item.institution}
              </Text>
              <Text style={[styles.text, { color: theme.text }]}>
                {item.course}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            💼 Experiência Profissional
          </Text>

          {experiences.map((item) => (
            <View key={item.id} style={{ marginBottom: 12 }}>
              <Text style={[styles.text, { color: theme.text, fontWeight: '600' }]}>
                {item.company}
              </Text>
              <Text style={{ color: theme.subtitle }}>
                {item.role}
              </Text>
              <Text style={{ color: theme.text }}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },

  card: {
    padding: 18,
    borderRadius: 16
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10
  },

  text: {
    fontSize: 14,
    lineHeight: 20
  },

  switchContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});