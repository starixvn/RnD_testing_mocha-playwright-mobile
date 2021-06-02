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
    // await uiUtils.waitEl(VipSedieLocator.Title)
    await page.$eval(VipSedieLocator.Title, (el) => el.scrollIntoView(true))
    // await uiUtils.clickEl(VipSedieLocator.Title)
}

export const verifySettlement = async(_choice,_chip) => {
    let winloss =0
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
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
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
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
}

export const verifyTotalTimeOfARound = async() => {
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(VipSedieLocator.Timer,'29'),true)
    const starttime = Date.now()
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 39 || t === 40,true,`Verify total time of a round is 39s Failed, total time is: ${t}s`)
}

export const verifyShakingPlate = async() => {
    // Wait to end Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(VipSedieLocator.Timer,'01'),true)
    const starttime = Date.now()
    // Wait to shaking finish
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(VipSedieLocator.WaitingTime,'05'),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 2 || t === 3,true,`Verify time for shaking plate is 3s Failed, total time is: ${t}s`)
}

export const verifyBetChoices = async() => {
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    for(let choice of Choice){
        await uiUtils.waitEl(VipSedieLocator[`${choice}`].Choice)
        await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator[`${choice}`].Odds),"1:"+VipSedieLocator.Odds[`${choice}`].toString()) 
    }
}

export const verifyBlockBettingTime = async() => {
    await GameLobbyFunc.placeBetAtBlockBettingTime(VipSedieLocator.Timer,VipSedieLocator.lblLockBet)
}

export const verifyBettingAtSettleTime = async() => {
    // const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    // hard code bet on Event choice
    await GameLobbyFunc.placeBetOnSettleTime(VipSedieLocator.Even.Choice,VipSedieLocator.WaitingTime,VipSedieLocator.lblMessage)
}

export const verifyMinBet = async() => {
    await GameLobbyFunc.selectChip(1)
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    await waitToNextRound()
    for(let choice of Choice){
        await GameLobbyFunc.minMaxBet(VipSedieLocator[`${choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator.lblMessage,VipSedieLocator.msgMinBet+VipSedieLocator[`${choice}`].minMaxBet[0])
    }
}

export const verifyMaxBet = async() => {
    await GameLobbyFunc.selectChip(3000)
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    for(let choice of Choice){
        await waitToNextRound()
        await GameLobbyFunc.minMaxBet(VipSedieLocator[`${choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator.lblMessage,VipSedieLocator.msgMaxBet+VipSedieLocator[`${choice}`].minMaxBet[1])
    }

}