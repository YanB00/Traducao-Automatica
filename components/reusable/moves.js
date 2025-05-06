// Importa as bibliotecas necessárias do React e React Native
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "../../assets/styles"; // Importa os estilos personalizados
import { pokemonColors } from "../../store/action"; // Importa as cores dos Pokémon
import './../../translate/i18n';
import { useTranslation } from "react-i18next";

export default function Moves(props) {
    const {t, i18n} = useTranslation();
    const { item } = props; // Desestrutura a prop item

    const pokemonColor = pokemonColors[item.type];

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {
                    // Mapeia o array de movimentos do item para renderizar cada movimento
                    item.moves.map((move, idx) => {
                        // Formata a chave de tradução para o nome do movimento
                        const moveNameKey = move.move.name;
                        return (
                            // Cria uma View para cada movimento com uma chave única
                            <View key={idx} style={{ backgroundColor: pokemonColor, borderRadius: 5, alignSelf: "baseline", margin: 5, opacity: 0.4 }}>
                                {/* Exibe o nome do movimento traduzido */}
                                <Text style={{ color: "black", padding: 5 }}>{t(moveNameKey)}</Text>
                            </View>
                        );
                    })
                }
            </View>
        </ScrollView>
    );
}