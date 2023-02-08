import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../api/hooks"
import { RootState } from "../../../store"
import { setCurrentDate } from "../../../store/mainSlice"

type selectedType = {
    day: number,
    title: string
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom:20,
    },
    tite: {
        fontSize: 16,
        lineHeight:22,
    },
    active_title: {
        fontSize: 16,
        lineHeight:22,
        textDecorationColor: '#000',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    }
})

export const SelectDate = () => {

    const { day } = useAppSelector((state:RootState) => state.mainSlice)
    const dispatch = useAppDispatch()
    const selected: Array<selectedType> = [
        {
            day: 1,
            title: 'сьогодні',
        },
        {
            day: 3,
            title: 'через 3 дні',
        },
        {
            day: 7,
            title: 'тиджень',
        },
        {
            day: 14,
            title: '2 тиждні',
        }
    ]
    const handleSelectDate = (day: number) => {
        dispatch(setCurrentDate(day))
    }
    return (
        <View style={styles.container}>
            {
                selected.map((item: selectedType, index: number ) => (
                    <TouchableOpacity onPress={() => handleSelectDate(item.day)} key={index}>
                        <Text style={day === item.day ? styles.active_title : styles.tite}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )

}