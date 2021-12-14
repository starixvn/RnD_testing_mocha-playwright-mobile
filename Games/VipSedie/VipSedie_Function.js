import { VipSedieLocator } from './VipSedie_Locator'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as uiUtils from '../../utils/uiUtils'
const fs = require('fs');
export const verifyPlaceBet = async(_choice,_chip) => {
    await GameLobbyFunc.verifyPlaceBet(VipSedieLocator[`${_choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator[`${_choice}`].OwnBet,_chip)
}
export const placeBet = async(_choice,_chip) => {
    await GameLobbyFunc.placeBet(VipSedieLocator[`${_choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator[`${_choice}`].OwnBet,_chip)
}
export const verifyLoginSuccessfully = async() => {
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.Title), VipSedieLocator.VerifyText.vi.Title)
}
export const getRoundId = async() => {
    return await uiUtils.getText(VipSedieLocator.RoundId)
}

export const waitToNextRound = async() => {
    return await uiUtils.waitToTime(VipSedieLocator.Timer,'30')
}

export const isAvailableBet = async() => {
    return (parseInt(await uiUtils.getTextVipSedieLocator.Timer) > 7)
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
    await verifyPlaceBet(_choice,_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    // console.log(currentBalance)
    // Wait to next Round
    await waitToNextRound()
    await uiUtils.sleep(3000)
    let newBalance = await GameLobbyFunc.getBalance()
    // console.log(newBalance)
    if(await uiUtils.isWin(VipSedieLocator[`${_choice}`].Choice) === true) {
        winloss = Math.round(_chip * VipSedieLocator.Odds[`${_choice}`])
    }
    await uiUtils.shouldBeEqual(currentBalance + winloss , newBalance)
}
export const verifySettlementForAllChoice = async(_chip) => {
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    for(let choice of Choice){
        await verifySettlement(choice,_chip)
    }

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
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(VipSedieLocator.Timer,'30'),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 36 || t === 37,true,`Verify total time of a round is 39s Failed, total time is: ${t}s`)
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
    await GameLobbyFunc.selectChip(10)
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    await waitToNextRound()
    for(let choice of Choice){
        // if(await isAvailableBet() === false) await waitToNextRound()
        await GameLobbyFunc.minMaxBet(VipSedieLocator[`${choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator.lblMessage,VipSedieLocator.msgMinBet+VipSedieLocator[`${choice}`].minMaxBet[0],true)
        await uiUtils.sleep(4500)
    }
}

export const verifyMaxBet = async()=> {
    await GameLobbyFunc.selectChip(3000)
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    for(let choice of Choice){
        await waitToNextRound()
        await GameLobbyFunc.minMaxBet(VipSedieLocator[`${choice}`].Choice,VipSedieLocator.Timer,VipSedieLocator.lblMessage,VipSedieLocator.msgMaxBet+VipSedieLocator[`${choice}`].minMaxBet[1])
    }

}

export const verifyMaxBetPerRound = async()=> {
    // Hard code place bet on Odd - Even Choice
    await GameLobbyFunc.verifyMaxPerRound(VipSedieLocator.Even.Choice,VipSedieLocator.Odd.Choice,VipSedieLocator.Timer,VipSedieLocator.lblMessage,VipSedieLocator.msgMaxRound)
}

export const verifyLastRoundResult = async()=> {
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    await uiUtils.sleep(3000)
    let roundId = await uiUtils.getText(VipSedieLocator.RoundId)
    const Choice = ['Red4','Red3','Red2','White3','White4']
    let result,RedDot,WhiteDot
    let resultIndex = -1
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    for(let i = 0; i< Choice.length; i++) {
        if (await uiUtils.isWin(VipSedieLocator[`${Choice[i]}`].Choice) === true ) {
            resultIndex = i
            break
        }
    }
    ( resultIndex % 2 === 0 ) ? result = VipSedieLocator.VerifyText.vi.Even : result = VipSedieLocator.VerifyText.vi.Odd
    WhiteDot = resultIndex
    RedDot = 4 - WhiteDot

    // Click on LastRound on result line
    await uiUtils.clickEl(VipSedieLocator.LastRoundHistory)
    // Verify Selector
    // Round ID
    // console.log(await uiUtils.getText(VipSedieLocator.ToolTips.lblRound))
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.ToolTips.lblRound),await roundId,"RoundID is incorrect")
    // Result
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.ToolTips.lblResult), result)
    // RedDot
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.ToolTips.lblRedDot), RedDot.toString())
    // White Dot
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.ToolTips.lblWhiteDot), WhiteDot.toString())
}

export const openGameHistory = async() => {
    await GameLobbyFunc.openHistory()
    await GameLobbyFunc.selectGameOnHistory("VipSedie")
}
export const closeGameHistory = async() => {
    await GameLobbyFunc.closeHistory()
}
export const openGameGuide = async()=> {
    await GameLobbyFunc.openGuide()
    await GameLobbyFunc.selectGameOnGuide("VipSedie")
}
export const closeGameGuide = async() => {
    await GameLobbyFunc.closeGuide()
}

export const verifyGameHistory = async(_choice,_chip) => {
    await GameLobbyFunc.selectChip(_chip)
    let resultIndex = -1,result
    let winloss =0
    const Choice = ['White4','White3','Red2','Red3','Red4']
    await verifyPlaceBet(_choice,_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    let roundId = await uiUtils.getText(VipSedieLocator.RoundId)
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    let newBalance = await GameLobbyFunc.getBalance()
    if(await uiUtils.isWin(VipSedieLocator[`${_choice}`].Choice) === true) {
        winloss = Math.round(_chip * VipSedieLocator.Odds[`${_choice}`])
    }
    await uiUtils.shouldBeEqual(currentBalance + winloss , newBalance)
    for(let i = 0; i< Choice.length; i++) {
        if (await uiUtils.isWin(VipSedieLocator[`${Choice[i]}`].Choice) === true ) {
            resultIndex = i
            break
        }
    }
    await openGameHistory()

    // Verify result on History
    // RoundID
    await uiUtils.shouldBeEqual("#"+await uiUtils.getText(VipSedieLocator.History.LastRound),roundId)
    // result
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.History.LastResult),resultIndex.toString())
    // Choice Option
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.History.LastChoice),VipSedieLocator.VerifyText.vi[`${_choice}`]+"@"+VipSedieLocator.Odds[`${_choice}`])
    // Stake
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.History.LastStake),_chip.toString())
    // Winloss
    await uiUtils.shouldBeEqual(await uiUtils.getText(VipSedieLocator.History.LastWinLoss),winloss.toString())
    await closeGameHistory()
}

export const verifyHistory = async(_chip) => {
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    await uiUtils.sleep(3000)
    for(let choice of Choice){
        await verifyGameHistory(choice,_chip)
    }
}

export const verifyGuide = async()=> {
    await openGameGuide()
    const content = await uiUtils.getContentFrame(VipSedieLocator.Guide.Frame, VipSedieLocator.Guide.Text)
    await uiUtils.shouldBeEqual(content,VipSedieLocator.VerifyText.vi.GuideContent)
    // await uiUtils.shouldBeEqual("abc",(await uiUtils.getText(VipSedieLocator.Guide.Text)).toString())
    await closeGameGuide()
}

export const onQuickBet = async()=> {
    if(isQB  === false) await GameLobbyFunc.swicthQuickBet() 
}