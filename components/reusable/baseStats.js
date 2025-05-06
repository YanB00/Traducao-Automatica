// Importa as bibliotecas necessárias do React e React Native
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "../../assets/styles"; // Importa os estilos personalizados
import { ProgressBar, Colors } from 'react-native-paper'; // Importa componentes da biblioteca react-native-paper
import './../../translate/i18n';
import { useTranslation } from "react-i18next";

// Define o componente funcional Stats que recebe props como argumento
export default function Stats(props) {

    const { item } = props; // Desestrutura a prop item
    const { t } = useTranslation(); // Obtém a função de tradução

    return (
        // Envolve o conteúdo em um ScrollView para permitir rolagem
        <ScrollView>
            {
                item.stats.map((stat, idx) => {
                    const statNameKey = stat.stat.name;
                    const translatedStatName = t(statNameKey);
                    const capitalizedStatName = translatedStatName.charAt(0).toUpperCase() + translatedStatName.slice(1);

                    return (
                        <View key={idx} style={{ flexDirection: "row", marginBottom: 20 }}>
                            {/* Exibe o nome da estatística traduzido e capitalizado */}
                            <Text style={styles.stats__title}>{capitalizedStatName}</Text>
                            {/* Exibe o valor base da estatística */}
                            <Text style={styles.stats__text}>{stat.base_stat}</Text>
                            {/* Cria uma barra de progresso para a estatística */}
                            <View style={{ width: 130, alignContent: "center", paddingTop: 10 }}>
                                <ProgressBar progress={stat.base_stat / 100} color={Colors.grey800} />
                            </View>
                        </View>
                    );
                })
            }
        </ScrollView>
    );
}