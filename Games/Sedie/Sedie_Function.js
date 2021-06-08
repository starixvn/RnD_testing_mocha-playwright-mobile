import { SedieLocator } from './Sedie_Locator'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as uiUtils from '../../utils/uiUtils'
export const verifyPlaceBet = async(_choice,_chip) => {
    await GameLobbyFunc.verifyPlaceBet(SedieLocator[`${_choice}`].Choice,SedieLocator.Timer,SedieLocator[`${_choice}`].OwnBet,_chip)
}
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

export const isAvailableBet = async() => {
    return (parseInt(await uiUtils.getTextSedieLocator.Timer) > 7)
}
export const scrollToGame = async() => {
    // await uiUtils.waitEl(SedieLocator.Title)
    await page.$eval(SedieLocator.Title, (el) => el.scrollIntoView(true))
    // await uiUtils.clickEl(SedieLocator.Title)
}

export const verifySettlement = async(_choice,_chip) => {
    let winloss =0
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    await verifyPlaceBet(_choice,_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    console.log(currentBalance)
    // Wait to next Round
    await waitToNextRound()
    let newBalance = await GameLobbyFunc.getBalance()
    console.log(newBalance)
    if(await uiUtils.isWin(SedieLocator[`${_choice}`].Choice) === true) {
        winloss = _chip * SedieLocator.Odds[`${_choice}`]
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
    const elStatisticBroad = await page.$$(SedieLocator.StatisticScoreBoard)
    for(let i=0 ; i < elStatisticBroad.length; i++){
        siStatisticBroad[parseInt(await uiUtils.getText(`(${SedieLocator.StatisticScoreBoard})[${i+1}]`))]++
    }
    // Verify Statistic
    // Chẵn
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(SedieLocator.StatisticEven),
        parseInt((siStatisticBroad[0]+siStatisticBroad[2]+siStatisticBroad[4])/elStatisticBroad.length*100)+'%'
    )
    // Lẻ
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(SedieLocator.StatisticOdd),
        parseInt((siStatisticBroad[1]+siStatisticBroad[3])/elStatisticBroad.length*100)+'%'
    )
}

export const verifyTotalTimeOfARound = async() => {
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(SedieLocator.Timer,'29'),true)
    const starttime = Date.now()
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(SedieLocator.Timer,'30'),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 39 || t === 40,true,`Verify total time of a round is 39s Failed, total time is: ${t}s`)
}

export const verifyShakingPlate = async() => {
    // Wait to end Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(SedieLocator.Timer,'01'),true)
    const starttime = Date.now()
    // Wait to shaking finish
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(SedieLocator.WaitingTime,'05'),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 2 || t === 3,true,`Verify time for shaking plate is 3s Failed, total time is: ${t}s`)
}

export const verifyBetChoices = async() => {
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    for(let choice of Choice){
        await uiUtils.waitEl(SedieLocator[`${choice}`].Choice)
        await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator[`${choice}`].Odds),"1:"+SedieLocator.Odds[`${choice}`].toString()) 
    }
}

export const verifyBlockBettingTime = async() => {
    await GameLobbyFunc.placeBetAtBlockBettingTime(SedieLocator.Timer,SedieLocator.lblLockBet)
}

export const verifyBettingAtSettleTime = async() => {
    // const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    // hard code bet on Event choice
    await GameLobbyFunc.placeBetOnSettleTime(SedieLocator.Even.Choice,SedieLocator.WaitingTime,SedieLocator.lblMessage)
}

export const verifyMaxBet = async()=> {
    await GameLobbyFunc.selectChip(3000)
    const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
    for(let choice of Choice){
        await waitToNextRound()
        await GameLobbyFunc.minMaxBet(SedieLocator[`${choice}`].Choice,SedieLocator.Timer,SedieLocator.lblMessage,SedieLocator.msgMaxBet+SedieLocator[`${choice}`].minMaxBet[1])
    }

}

export const verifyMaxBetPerRound = async()=> {
    // Hard code place bet on Odd - Even Choice
    await GameLobbyFunc.verifyMaxPerRound(SedieLocator.Even.Choice,SedieLocator.Odd.Choice,SedieLocator.Timer,SedieLocator.lblMessage,SedieLocator.msgMaxRound)
}

export const verifyLastRoundResult = async()=> {
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    await uiUtils.sleep(3000)
    let roundId = await uiUtils.getText(SedieLocator.RoundId)
    const Choice = ['Red4','Red3','Red2','White3','White4']
    let result,RedDot,WhiteDot
    let resultIndex = -1
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    for(let i = 0; i< Choice.length; i++) {
        if (await uiUtils.isWin(SedieLocator[`${Choice[i]}`].Choice) === true ) {
            resultIndex = i
            break
        }
    }
    ( resultIndex % 2 === 0 ) ? result = SedieLocator.VerifyText.vi.Even : result = SedieLocator.VerifyText.vi.Odd
    WhiteDot = resultIndex
    RedDot = 4 - WhiteDot

    // Click on LastRound on result line
    await uiUtils.clickEl(SedieLocator.LastRoundHistory)
    // Verify Selector
    // Round ID
    console.log(await uiUtils.getText(SedieLocator.ToolTips.lblRound))
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.ToolTips.lblRound),await roundId,"RoundID is incorrect")
    // Result
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.ToolTips.lblResult), result)
    // RedDot
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.ToolTips.lblRedDot), RedDot.toString())
    // White Dot
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.ToolTips.lblWhiteDot), WhiteDot.toString())
}

export const openGameHistory = async() => {
    await GameLobbyFunc.selectMenu(SedieLocator.btnMenu,SedieLocator.btnHistory,SedieLocator.History.Title,SedieLocator.VerifyText.vi.History)
}
export const openGameGuide = async()=> {
    await GameLobbyFunc.selectMenu(SedieLocator.btnMenu,SedieLocator.btnGuide,SedieLocator.Guide.Title,SedieLocator.VerifyText.vi.Guide)
}

export const closePopup = async() => {
    await uiUtils.clickEl(SedieLocator.btnClosePopup)
}

export const verifyGameHistory = async(_choice,_chip) => {
    await GameLobbyFunc.selectChip(_chip)
    let resultIndex = -1,result
    let winloss =0
    const Choice = ['White4','White3','Red2','Red3','Red4']
    await verifyPlaceBet(_choice,_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    let roundId = await uiUtils.getText(SedieLocator.RoundId)
    // Wait to next Round
    await uiUtils.shouldBeEqual(await waitToNextRound(),true)
    let newBalance = await GameLobbyFunc.getBalance()
    if(await uiUtils.isWin(SedieLocator[`${_choice}`].Choice) === true) {
        winloss = _chip * SedieLocator.Odds[`${_choice}`]
    }
    await uiUtils.shouldBeEqual(currentBalance + winloss , newBalance)
    for(let i = 0; i< Choice.length; i++) {
        if (await uiUtils.isWin(SedieLocator[`${Choice[i]}`].Choice) === true ) {
            resultIndex = i
            break
        }
    }
    await openGameHistory()

    // Verify result on History
    // RoundID
    await uiUtils.shouldBeEqual("#"+await uiUtils.getText(SedieLocator.History.LastRound),roundId)
    // result
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.History.LastResult),resultIndex.toString())
    // Choice Option
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.History.LastChoice),SedieLocator.VerifyText.vi[`${_choice}`]+"@"+SedieLocator.Odds[`${_choice}`])
    // Stake
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.History.LastStake),_chip.toString())
    // Winloss
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.History.LastWinLoss).winloss)
    await closePopup()
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
    // console.log(await uiUtils.getText(SedieLocator.Guide.Text))
    await uiUtils.shouldBeEqual(await uiUtils.getText(SedieLocator.Guide.Text),SedieLocator.VerifyText.vi.GuideContent)
    // await uiUtils.shouldBeEqual("abc",(await uiUtils.getText(SedieLocator.Guide.Text)).toString())
    await closePopup()
}

export const onQuickBet = async()=> {
    if(await GameLobbyFunc.isOnQuickBet()  === true) await GameLobbyFunc.swicthQuickBet() 
}