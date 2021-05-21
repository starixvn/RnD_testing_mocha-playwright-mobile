import { SedieLocator } from './Sedie_Locator'
import * as GameLobbyFunc from './../References/GameLobby_Functions'
import * as uiUtils from '../../utils/uiUtils'
export const placeBet = async(_choice,_chip) => {
    await GameLobbyFunc.placeBet(SedieLocator[`${_choice}`].Choice,SedieLocator.Timer,SedieLocator[`${_choice}`].OwnBet,_chip)
}
export const verifyLoginSuccessfully = async() => {
    await uiUtils.waitEl(SedieLocator.Title)
}
export const getRoundId = async() => {
    return await uiUtils.getText(SedieLocator.RoundId)
}

export const waitToNextRound = async() => {
    return await uiUtils.waitToTime(SedieLocator.Timer,'30')
}

export const waitToBlockBetting = async() => {
    return await uiUtils.waitToTime(SedieLocator.Timer,'5')
}

export const verifyeSettlement = async(_choice,_chip) => {
    let winloss =0
    // Wait to next Round
    await waitToNextRound()
    await placeBet(_choice,_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    // Wait to next Round
    await waitToNextRound()
    let newBalance = await GameLobbyFunc.getBalance()
    console.log(newBalance)
    if(await uiUtils.isWin(SedieLocator[`${_choice}`].Choice) === true) {
        winloss = _chip * SedieLocator.Odds[`${_choice}`]
    }
    await uiUtils.shouldBeEqual(currentBalance + winloss , newBalance)
}
export const verifyStatisticBroad = async() => {
    await waitToNextRound()
    let siStatisticBroad = [0,0,0,0,0]
    const elStatisticBroad = await page.$$(SedieLocator.StatisticScoreBoard)
    console.log(elStatisticBroad)
    // for(let i=0 ; i < elStatisticBroad.length; i++){
    //     siStatisticBroad[parseInt(await uiUtils.getText(await elStatisticBroad[i]))]++
    // }
    // console.log(siStatisticBroad[1])
}