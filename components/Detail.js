import React, { useState } from "react";
import { Text, View, Image, SafeAreaView, TouchableOpacity} from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../assets/styles";
import { pokemonColors } from "../store/action";
import About from "./reusable/about";
import Stats from "./reusable/baseStats";
import Moves from "./reusable/moves";
import { useTranslation } from "react-i18next";
import './../translate/i18n'
import Icon from 'react-native-vector-icons/Ionicons'; // Importe a biblioteca de ícones que você preferir

export default function Detail({ navigation, route }) {
    const item = route.params
    const [menu, setMenu] = useState("sobre")
    const {t,i18n} = useTranslation();


    const pokemonColor = pokemonColors[item.type];
    const bgStyles = { ...styles.container, backgroundColor: pokemonColor };

    const listMenuInfo = [
        {
            option: t("About")
        },
        {
            option: t("Base Stats")
        },
        {
            option: t("Moves")
        },
    ]

    const setMenuOption = menu => {
        return setMenu(menu)
    }

    const btnActive = {
        color: pokemonColor,
    }

    return (
        <SafeAreaView style={bgStyles}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                accessibilityLabel={t('Voltar')}
                accessibilityHint={t('Retorna para a tela anterior')}
                >
            <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.text__titleDetail}>{item.name}</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20, marginRight: 30 }}>
                    {item.types ?
                        item.types.map((type, idx) => {
                            return (
                                <View key={idx} style={{ backgroundColor: "#fff", opacity: .2, borderRadius: 15, alignSelf: "baseline", margin: 5 }}>
                                    <Text style={{ color: "black", padding: 5, opacity: 1, fontWeight: "bold", fontSize: 20, marginLeft: 10, marginRight: 10 }}>{t(type.type.name)}</Text>
                                </View>
                            )
                        })
                        : <View></View>}

                </View>
                <View style={{ paddingRight: 20 }}>
                    <Text style={{ color: "#fff", opacity: .8, fontWeight: "bold", fontSize: 40, }}>
                        #{`${item.id}`.padStart(3, 0)}
                    </Text>
                </View>
            </View>
            <View style={{
                alignItems: "center",
                elevation: 5,
            }}>
                <Image
                    style={styles.detail__imagePokemon}
                    source={{ uri: item.imgUrl }}
                />
            </View>
            <View style={styles.container__moves}>
                <SafeAreaView style={styles.detail__containerInfo}>
                    <View style={styles.detail__listTab}>
                        {
                            listMenuInfo.map(e => {
                                return (
                                    <TouchableOpacity
                                    key={e.option}
                                    style={[styles.detail__btnTab, menu === e.option && { borderBottomWidth: 1, borderBottomColor: pokemonColor }]}
                                    onPress={() => setMenuOption(e.option)}
                                    activeOpacity={0.15} 
                                >
                                    <Text style={[styles.detail__textTab, menu === e.option && btnActive]}>{e.option}</Text>
                                </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View>
                        <View style={{ paddingBottom: 80 }}>
                            {menu === t('Moves') ?
                                <Moves item={item}></Moves> : <View></View>
                            }

                            {menu === t("About") ?
                                <About item={item}></About> : <View></View>
                            }

                            {menu === t("Base Stats") ?
                                <Stats item={item}></Stats> : <View></View>
                            }
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </SafeAreaView>
    )
}
