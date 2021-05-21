import { VipSedieLocator } from './VipSedie_Locator'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as uiUtils from '../../utils/uiUtils'
export const placeBet = async(_choice,_chip) => {
    await GameLobbyFunc.placeBet(VipSedieLocator[`${_choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator[`${_choice}`].OwnBet,_chip)
}
export const verifyLoginSuccessfully = async() => {
    await uiUtils.waitEl(VipSedieLocator.Title)
}
export const getRoundId = async() => {
    return await uiUtils.getText(VipSedieLocator.RoundId)
}

export const waitToNextRound = async() => {
    return await uiUtils.waitToTime(VipSedieLocator.Timer,'30')
}

export const waitToBlockBetting = async() => {
    return await uiUtils.waitToTime(VipSedieLocator.Timer,'5')
}
export const scrollToGame = async() => {
    await page.$eval(VipSedieLocator.Title, el => el.scrollIntoView(true))
    await uiUtils.clickEl(VipSedieLocator.Title)
}

export const verifyeSettlement = async(_choice,_chip) => {
    let winloss =0
    // Wait to next Round
    await waitToNextRound()
    await placeBet(_choice,_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    console.log(currentBalance)
    // Wait to next Round
    await waitToNextRound()
    let newBalance = await GameLobbyFunc.getBalance()
    console.log(newBalance)
    if(await uiUtils.isWin(VipSedieLocator[`${_choice}`].Choice) === true) {
        winloss = _chip * VipSedieLocator.Odds[`${_choice}`]
    }
    await uiUtils.shouldBeEqual(currentBalance + winloss , newBalance)
}
export const verifyStatisticBroad = async() => {
    await waitToNextRound()
    let siStatisticBroad = [0,0,0,0,0]
    const elStatisticBroad = await page.$$(VipSedieLocator.StatisticScoreBoard)
    for(let i=0 ; i < elStatisticBroad.length; i++){
        siStatisticBroad[parseInt(await uiUtils.getText(`(${VipSedieLocator.StatisticScoreBoard})[${i+1}]`))]++
    }
    // Verify Statistic
    // Chẵn
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticEven),
        parseInt((siStatisticBroad[0]+siStatisticBroad[2]+siStatisticBroad[4])/elStatisticBroad.length*100)+'%'
    )
    // Lẻ
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticOdd),
        parseInt((siStatisticBroad[1]+siStatisticBroad[3])/elStatisticBroad.length*100)+'%'
    )
    // 0
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticWhite4),
        parseInt(siStatisticBroad[0]/elStatisticBroad.length*100)+'%'
    )
    // 0
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticWhite4),
        parseInt(siStatisticBroad[0]/elStatisticBroad.length*100)+'%'
    )
    // 1
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticWhite3),
        parseInt(siStatisticBroad[1]/elStatisticBroad.length*100)+'%'
    )
    // 2
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticRed2),
        parseInt(siStatisticBroad[2]/elStatisticBroad.length*100)+'%'
    )
    // 3
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticRed3),
        parseInt(siStatisticBroad[3]/elStatisticBroad.length*100)+'%'
    )
    // 4
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(VipSedieLocator.StatisticRed4),
        parseInt(siStatisticBroad[4]/elStatisticBroad.length*100)+'%'
    )
}

export const verifyResultForLastRound = async () => {

}