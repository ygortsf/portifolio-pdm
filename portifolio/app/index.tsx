import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../service/api';

type User = {
  id: string;
  name: string;
  email: string;
  summary: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/users/f5ce9e50-d17f-46f5-adfb-b04892508927');
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.summary}>{user.summary}</Text>
      <Text style={styles.summary}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10
  },
  summary: {
    fontSize: 16,
    textAlign: 'center'
  }
});