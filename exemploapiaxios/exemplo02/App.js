import { useEffect, useState } from 'react';
import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import api from './src/services/api';

export default function App() {
  const [dog, setDog] = useState(null);  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscar();
  }, []);

  async function buscar() {
    setLoading(true);
    try {
      const result = await api.get('https://dog.ceo/api/breeds/image/random');
      console.log(result.data);
      setDog(result.data.message);  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Clique aqui" onPress={buscar} />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {loading && <Text>Carregando</Text>}
        {dog && (
          <Image
            source={{ uri: dog }}
            style={{ width: 500, height: 500, marginTop: 20 }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
});
