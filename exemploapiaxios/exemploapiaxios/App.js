import { useEffect, useState } from 'react';
import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import api from './src/services/api';

export default function App() {
  const [cats, setCats] = useState([]);
   const [loading, setLoading] = useState(false);  

  useEffect(()=> {
    buscar()
  },[])

  async function buscar() {
    setLoading(true);  
    try {
      const result = await api.get('https://api.thecatapi.com/v1/images/search?limit=5');
      console.log(result.data);
      setCats(result.data);  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);  
    }
  }

  
  const _render = () => {
    return cats.map((item, index) => (
      <View style={styles.card} key={index}>
        <Image
          source={{ uri: item.url }}
          style={{ width: 500, height: 500 }}
        />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Button title="Clique aqui" onPress={buscar} />
      <ScrollView>
        {loading ? (
          <Text>Carregando...</Text>  
        ) : (
          _render()
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
  card: {
    width: "100%",
    alignItems: 'center',
  },
});
