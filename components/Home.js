import React, { useEffect } from "react";
import { Text, Image, View, Button, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/styles";
import { fetchPokemons } from "../store/action";
import PokemonCard from "./reusable/card";
import { useTranslation } from "react-i18next";
import "./../translate/i18n";

// Componente principal Home
export default function Home({ navigation }) {
  // useDispatch é usado para despachar ações para o store do Redux
  const dispatch = useDispatch();
  // useSelector é usado para acessar o estado do Redux
  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const next = useSelector((state) => state.next);
  const { t, i18n } = useTranslation();

  // useEffect é usado para executar efeitos colaterais, como buscar dados
  useEffect(() => {
    const fetchData = async () => {
      // Despacha a ação fetchPokemons com o próximo conjunto de dados
      await dispatch(fetchPokemons(next));
    };

    // Chama a função fetchData quando o componente é montado
    fetchData();
  }, []);

  return (
    // View principal do componente
    <View style={styles.container}>
      <Image source={require("./../assets/logo.webp")} style={styles.logo} />

      {/* Contador de Pokémons */}
      <View style={localStyles.pokemonCounterContainer}>
        <Text style={localStyles.pokemonCounterText}>
          {t("Exibindo")} {pokemons.length} {t("Pokémons")}
        </Text>
      </View>

      <FlatList
        data={pokemons} // Dados da lista
        numColumns={2} // Número de colunas
        showsVerticalScrollIndicator={false} // Esconde a barra de rolagem vertical
        keyExtractor={(pokemon) => String(pokemon.id)} // Chave única para cada item
        renderItem={({ item }) => <PokemonCard pokemon={{ ...item, name: t(item.name) }} />} // Renderiza cada item usando o componente PokemonCard
        contentContainerStyle={styles.flatListContentContainer} // Estilo do container da lista
      />
      
      {/* Botão para carregar mais Pokémons */}
      <View style={{ padding: 5, marginTop: 10 }}>
        <Button
          title={t("Show More")}
          color={"gray"}
          onPress={() => dispatch(fetchPokemons(next))}
        />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  pokemonCounterContainer: {
    paddingVertical: 15, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  pokemonCounterText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'gray',
  },
});

