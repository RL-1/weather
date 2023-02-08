import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";
import { themeType } from "../MainPage";


type changeThemeType = {
    theme: themeType.LIGHT | themeType.DARK,
    handleChange: () => void;
}

const style = StyleSheet.create({
    button: {
        borderStyle: 'solid',
        borderColor: '#000',
        borderRadius: 12,
        borderWidth:1,
        padding:6,
        textAlign:'center',
    },
    text: {
        textAlign:'center'
    }
})


export const ChangeTheme = ({ theme, handleChange }: changeThemeType) => {


    return(
        <TouchableOpacity style={style.button} onPress={handleChange}>
            <Text style={style.text}>Текущая тема: {theme}</Text>
        </TouchableOpacity>
    )

}