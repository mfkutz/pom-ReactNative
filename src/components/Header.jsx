import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const options = ["Pomodoro", "Short Break", "Long Break"]

export const Header = ({ currentTime, setCurrentTime, setTime }) => {

    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
        setCurrentTime(index)
        setTime(newTime * 60)
    }

    return (
        <View style={styles.view}>
            {options.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.itemStyle,
                        currentTime !== index && { borderColor: "transparent" }
                    ]}
                    onPress={() => handlePress(index)}
                >
                    <Text style={{ fontWeight: "bold" }}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemStyle: {
        borderWidth: 3,
        padding: 5,
        width: "33%",
        borderColor: "white",
        marginVertical: 20,
        alignItems: "center",
        borderRadius: 10
    },

})