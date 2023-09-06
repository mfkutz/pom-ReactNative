import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from "expo-av"

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"]

export default function App() {

  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      playAlarm()

      if (currentTime === 0) {
        setTime(25 * 60)
      }
      if (currentTime === 1) {
        setTime(5 * 60)
      }
      if (currentTime === 2) {
        setTime(15 * 60)
      }
    }

    return () => clearInterval(interval)

  }, [isActive, time])

  function handleStartStop() {
    setIsActive(!isActive)
    playSound()
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sound.mp3')
    )
    await sound.playAsync()
  }

  async function playAlarm() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/alarm.mp3')
    )
    await sound.playAsync()
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors[currentTime] }
    ]}>
      <Text style={styles.text}>Pomodoro</Text>
      <Header
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}
      />
      <StatusBar style="dark" />
      <Timer time={time} />
      <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <Text style={styles.textBtn}>
          {isActive ? "STOP" : "START"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  textBtn: {
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  }
})
