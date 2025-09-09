import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Snackbar from 'react-native-snackbar'
import Icons from './components/Icons'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() { 
  
  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] && 
      gameState[0] === gameState[2] && 
      gameState[0] !== 'empty'
    ){
      setGameWinner(`${gameState[0].toUpperCase()} won the game!`);
    }
    else if(
       gameState[3] === gameState[4] && 
      gameState[3] === gameState[5] && 
      gameState[3] !== 'empty'
    ){
      setGameWinner(`${gameState[3].toUpperCase()} won the game!`);
    }
    else if(
      gameState[6] === gameState[7] && 
      gameState[6] === gameState[8] && 
      gameState[6] !== 'empty'
    ){
      setGameWinner(`${gameState[6].toUpperCase()} won the game!`);
    }
    else if(
      gameState[0] === gameState[3] && 
      gameState[0] === gameState[6] && 
      gameState[6] !== 'empty'
    ){
      setGameWinner(`${gameState[6].toUpperCase()} won the game!`);
    }
    else if(
      gameState[1] === gameState[4] && 
      gameState[7] === gameState[1] && 
      gameState[1] !== 'empty'
    ){
      setGameWinner(`${gameState[1].toUpperCase()} won the game!`);
    }
    else if(
      gameState[2] === gameState[5] && 
      gameState[2] === gameState[8] && 
      gameState[2] !== 'empty'
    ){
      setGameWinner(`${gameState[2].toUpperCase()} won the game!`);
    }
    else if(
      gameState[0] === gameState[4] && 
      gameState[0] === gameState[8] && 
      gameState[0] !== 'empty'
    ){
      setGameWinner(`${gameState[0].toUpperCase()} won the game!`);
    } 
    else if(
      gameState[0] !== 'empty' && gameState[1] !== 'empty' && gameState[2] !== 'empty' && gameState[3] !== 'empty' && gameState[4] !== 'empty' && gameState[5] !== 'empty' && gameState[6] !== 'empty' && gameState[7] !== 'empty' && gameState[8] !== 'empty'){
      setGameWinner(`It's a Draw play again`);
    }
    else if(
      gameState[2] === gameState[4] && 
      gameState[4] === gameState[6] && 
      gameState[2] !== 'empty'
    ){
      setGameWinner(`${gameState[2].toUpperCase()} won the game!`);
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if(gameWinner){
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        duration: Snackbar.LENGTH_LONG,
        textColor: '#ffffff'
      })
    }

    if(gameState[itemNumber] === 'empty'){
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    }else{
      return Snackbar.show(
        {
          text: 'position is already filled',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_LONG,
          textColor: '#ffffff'
        }
      )
    }

    checkIsWinner()
  }

  return (
    <SafeAreaView style={styles.mainBG}>
      <StatusBar />
      <View>
      { gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerText}>{gameWinner}</Text>
        </View>
      ) : (
      <View style={[styles.playerInfo, isCross ? styles.playerX: styles.playerO]}> 
        <Text style={styles.whosTurn}>
          Player {isCross? 'X': 'O'}'s turn
        </Text>
      </View>
    ) }
      {
        
      }
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
          key={index}
          style={styles.card}
          onPress={() => {
            ReactNativeHapticFeedback.trigger("impactHeavy", options);
            onChangeItem(index)}
          }
          >
            <Icons name={item} />
          </Pressable>
        )

        }
      />
      </View>
      <Pressable
          style={styles.resetBtn}
          onPress={() => reloadGame()}
          >
            <Text style={styles.btnText}>{gameWinner ? 'Start New Game' : 'Reload the Game'}</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainBG:{
    paddingTop: 25,
    backgroundColor:'pink',
    flex: 1
  },
  playerInfo:{
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems: 'center',
    paddingVertical : 10
  },
  whosTurn:{
    fontSize : 35,
    fontWeight : 'bold'
  },
  playerX:{
    backgroundColor: 'green'
  },
  playerO:{
    backgroundColor :'yellow'
  },
  winnerInfo:{
    backgroundColor: '#e1eb8fff'
  },
  winnerText:{
    fontSize : 35,
    fontWeight : 'bold'
  },
  grid:{
    marginTop: 20,
  },
  card:{
    flex: 1,
    backgroundColor: 'grey',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25
  },
  resetBtn:{
    backgroundColor: '#7a3737ff',
    margin: 10,
    marginTop : 50,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems: 'center',
    paddingVertical : 10
  },
  btnText:{
    fontSize : 30,
    fontWeight :'bold',
    color: 'white'
  }

})