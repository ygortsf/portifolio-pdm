import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../service/api';
import { Link } from 'expo-router';

type User = {
  id: string;
  name: string;
  email: string;
  summary: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/users/f5ce9e50-d17f-46f5-adfb-b04892508927');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user && (
        <>

          <View style={styles.header}>

            <Image
              source={require('../assets/images/ygor.jpeg')}
              style={styles.avatar}
            />

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.role}>Desenvolvedor Full Stack</Text>
            <Text style={styles.location}>📍 Camaragibe - PE</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Contato</Text>
            <Text style={styles.info}>📧 {user.email}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sobre mim</Text>
            <Text style={styles.summary}>
              Sou um desenvolvedor em constante evolução, apaixonado por tecnologia e por transformar ideias em soluções digitais funcionais e bem estruturadas. Tenho interesse em desenvolvimento web e aplicações modernas, buscando sempre aprimorar minhas habilidades tanto no front-end quanto no back-end.
            </Text>
          </View>

          <View style={styles.highlight}>
            <Text style={styles.highlightText}>
              🚀 Em busca da primeira oportunidade como desenvolvedor para aplicar e expandir meus conhecimentos.
            </Text>
          </View>
          <View style={styles.menu}>
            <Link href="/sobre" style={styles.button}>
              <Text style={styles.buttonText}> Sobre o App </Text>
            </Link>
          </View>
        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: '#0f172a'
  },

  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4f46e5'
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  menu: {
  marginTop: 10,
  paddingHorizontal: 15,
  gap: 10
},

button: {
  backgroundColor: '#6d0445',
  padding: 15,
  marginBlockStart: 19,
  borderRadius: 25
},

  role: {
    fontSize: 16,
    color: '#cbd5f5',
    marginTop: 5
  },

  location: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 5
  },

  card: {
    backgroundColor: '#1e293b',
    margin: 15,
    padding: 18,
    borderRadius: 16
  },
  buttonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 19
},

  cardTitle: {
    color: '#a5b4fc',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600'
  },

  info: {
    color: '#fff',
    fontSize: 16
  },

  summary: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22
  },

  highlight: {
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#4f46e5',
    padding: 18,
    borderRadius: 16
  }, 

  highlightText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15
  }
});