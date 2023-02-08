import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAppSelector } from "../../../api/hooks"
import { RootState } from "../../../store"




const styles = StyleSheet.create({
    text:{
        color: "#000"
    }
})

export const WeatherView = () => {
    const { weatherLocation, weatherDays } = useAppSelector((state:RootState) => state.mainSlice)
    return (
        <View>
            <Text style={styles.text}>Страна: {weatherLocation.country} / {weatherLocation.name}</Text>
            <Text style={styles.text}>Температура по С*: {Math.round(weatherDays.day.avgtemp_c)}</Text>
        </View>
    )

}