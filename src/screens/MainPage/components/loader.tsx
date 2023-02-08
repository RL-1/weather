import { StyleSheet, View, ActivityIndicator } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });

export const Loader = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator />
        </View>
    )
}