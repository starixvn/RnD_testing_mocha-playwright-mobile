import { BigSmallLocator } from './BigSmall_Locator'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as uiUtils from '../../utils/uiUtils'
export const verifyPlaceBet = async(_choice,_chip) => {
    await GameLobbyFunc.verifyPlaceBet(BigSmallLocator[`${_choice}`].Choice,BigSmallLocator.Timer,BigSmallLocator[`${_choice}`].OwnBet,_chip)
}
export const placeBet = async(_choice,_chip) => {
    await GameLobbyFunc.placeBet(BigSmallLocator[`${_choice}`].Choice,BigSmallLocator.Timer,_chip)
}
export const verifyLoginSuccessfully = async() => {
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.Title), BigSmallLocator.VerifyText.vi.Title)
}

export const getRoundId = async() => {
    return await uiUtils.getText(BigSmallLocator.RoundId)
}

export const waitToNextRound = async() => {
    return await uiUtils.waitToTime(BigSmallLocator.Timer,'50')
}

export const isAvailableBet = async() => {
    return (parseInt(await uiUtils.BigSmallLocator.Timer) > 7)
}
export const scrollToGame = async() => {
    await page.$eval(BigSmallLocator.Title, (el) => el.scrollIntoView(true))
}

export const verifyTotalTimeOfARound = async() => {
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(BigSmallLocator.Timer,'49'),true)
    const starttime = Date.now()
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(BigSmallLocator.Timer,'50'),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 61 || t === 62,true,`Verify total time of a round is 61s Failed, total time is: ${t}s`)
}
export const verifyBlockBettingTime = async() => {
    await GameLobbyFunc.placeBetAtBlockBettingTime(BigSmallLocator.Timer,BigSmallLocator.lblLockBet)
}
export const onQuickBet = async()=> {
    if(isQB === false) await GameLobbyFunc.swicthQuickBet() 
}
export const offQuickBet = async()=> {
    if(isQB === true) await GameLobbyFunc.swicthQuickBet("off") 
}
export const verifyBetAtTimeOfBalancingBettingPool = async() => {
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.lblBalanceBettingPool), BigSmallLocator.VerifyText.vi.BalanceBettingPool)
}

export const verifyBetChoices = async() => {
    const Choice = ['Big','Small']
    for(let choice of Choice){
        await uiUtils.waitEl(BigSmallLocator[`${choice}`].Choice)
        await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator[`${choice}`].Odds),"1:"+BigSmallLocator.Odds.toString()) 
    }
}

export const verifyMaxBet = async() => {
    await GameLobbyFunc.selectChip(3000)
    const Choice = ['Big','Small']
    for(let choice of Choice){
        await waitToNextRound()
        await GameLobbyFunc.minMaxBet(BigSmallLocator[`${choice}`].Choice,BigSmallLocator.Timer,BigSmallLocator.lblMessage,BigSmallLocator.msgMaxRound)
    }

}
export const verifyCanBetOnlyOneChoiceInARound = async() => {
    await waitToNextRound()
    await verifyPlaceBet("Big",1)
    await placeBet("Small",1)
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.lblMessage),BigSmallLocator.VerifyText.vi.OneChoiceInARound)
}

export const verifyStatisticBroad = async() => {
    // Wait to next Round
    await waitToNextRound()
    let siStatisticBroad = [0,0]
    const elStatisticBroad = await page.$$(BigSmallLocator.StatisticScoreBoard)
    for(let i=0 ; i < elStatisticBroad.length; i++){
        if(await uiUtils.getText(`(${BigSmallLocator.StatisticScoreBoard})[${i+1}]`) === "T") siStatisticBroad[0]++
        else siStatisticBroad[1]++
    }
    // Verify Statistic
    // Tài
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(BigSmallLocator.StatisticBig),
        parseInt((siStatisticBroad[0])/elStatisticBroad.length*100)+'%'
    )
    // Xỉu
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(BigSmallLocator.StatisticSmall),
        parseInt((siStatisticBroad[1])/elStatisticBroad.length*100)+'%'
    )
}

export const openGameHistory = async() => {
    await GameLobbyFunc.openHistory()
    await GameLobbyFunc.selectGameOnHistory("BigSmall")
}
export const closeGameHistory = async() => {
    await GameLobbyFunc.closeHistory()
}
export const openGameGuide = async()=> {
    await GameLobbyFunc.openGuide()
    await GameLobbyFunc.selectGameOnGuide("BigSmall")
}
export const closeGameGuide = async() => {
    await GameLobbyFunc.closeGuide()
}
export const verifyGuide = async()=> {
    await openGameGuide()
    const content = await uiUtils.getContentFrame(BigSmallLocator.Guide.Frame, BigSmallLocator.Guide.Text)
    await uiUtils.shouldBeEqual(content,BigSmallLocator.VerifyText.vi.GuideContent)
    await closeGameGuide()
}

const clickRoundHistory = async(_roundid)=> {
    _roundid = _roundid.replace("#","")
    let _el = BigSmallLocator.DotRoundHistory + _roundid + "']"
    await uiUtils.clickEl(_el)
}

export const verifyLastRoundResult = async()=> {
    // Wait to next Round
    await waitToNextRound()
    await uiUtils.sleep(3000)
    let roundId = await uiUtils.getText(BigSmallLocator.RoundId)
    const Choice = ['Big','Small']
    let result=[0,0,0],resultRound
    // Wait to Result
    let tmp = "?" + roundId.replace("#","")
    result[0] = (await uiUtils.getAttribute(BigSmallLocator.ResultDice.Dice1,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[1] = (await uiUtils.getAttribute(BigSmallLocator.ResultDice.Dice2,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[2] = (await uiUtils.getAttribute(BigSmallLocator.ResultDice.Dice3,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    resultRound = parseInt(await uiUtils.getText(BigSmallLocator.ResultDice.Total))
    await uiUtils.sleep(3000)
    await clickRoundHistory(roundId)

    let rsText = (resultRound > 10) ? BigSmallLocator.VerifyText.vi.Big : BigSmallLocator.VerifyText.vi.Small
    rsText += `(${result[0]}-${result[1]}-${result[2]})`
    console.log(rsText)

    // Verify Last RoundID
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.ToolTips.lblRound),roundId.toString())
    // Verify Result
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.ToolTips.lblTitle),rsText)

    return { dice:result, total:resultRound }
}

export const verifySettlementAndHistory = async(_choice,_chip) => {
    await GameLobbyFunc.selectChip(_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    let roundId = await uiUtils.getText(BigSmallLocator.RoundId)
    await verifyPlaceBet(_choice,_chip)
    await uiUtils.shouldBeEqual(await GameLobbyFunc.getBalance(), currentBalance - _chip)
    currentBalance = await GameLobbyFunc.getBalance()

    let result=[0,0,0],resultRound
    let winloss, balanceAfterSettle
    // Wait to Result
    let tmp = "?" + roundId.replace("#","")
    result[0] = (await uiUtils.getAttribute(BigSmallLocator.ResultDice.Dice1,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[1] = (await uiUtils.getAttribute(BigSmallLocator.ResultDice.Dice2,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[2] = (await uiUtils.getAttribute(BigSmallLocator.ResultDice.Dice3,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    resultRound = parseInt(await uiUtils.getText(BigSmallLocator.ResultDice.Total))
    const isBig = (resultRound > 10) ? true : false
    let isWin
    if( _choice === "Big") {
        (isBig === true) ? isWin = true : isWin = false
    } else {
        (isBig === false) ? isWin = true : isWin = false
    }
    let resultIndex = `${result[0]}-${result[1]}-${result[2]} ${resultRound}`
    // Wait to next Round
    await waitToNextRound()
    await uiUtils.sleep(3000)
    await openGameHistory()
     // Verify result on History
    // RoundID
    await uiUtils.shouldBeEqual("#"+await uiUtils.getText(BigSmallLocator.History.LastRound),roundId,"Verify Round Id is Failed")
    // result
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.History.LastResult),resultIndex,"Verify result is Failed")
    // Choice Option
    await uiUtils.shouldBeEqual(await uiUtils.getText(BigSmallLocator.History.LastChoice),BigSmallLocator.VerifyText.vi[`${_choice}`]+"@"+BigSmallLocator.Odds,"Verify choice option is Failed")
    // Stake
    await uiUtils.shouldBeEqual((await uiUtils.getText(BigSmallLocator.History.LastStake)).replace(',',''),_chip.toString(),"Verify stake is Failed")
    let refundStake = parseInt(await uiUtils.getText(BigSmallLocator.History.LastRefund))
    let acceptStake = _chip - refundStake
    if (isWin === true) {
        winloss = Math.round(((acceptStake * BigSmallLocator.Odds) - acceptStake)*100)/100
        balanceAfterSettle = Math.round((currentBalance + refundStake + _chip + winloss)*100)/100
    } else {
        winloss = 0
        balanceAfterSettle = currentBalance + refundStake
    }
    // Winloss
    await uiUtils.shouldBeEqual((await uiUtils.getText(BigSmallLocator.History.LastWinLoss)).replace(',',''),winloss.toString(),"Verify winloss is Failed")
    await closeGameHistory()

    // Verify balance after settle
    // console.log("Verify")
    // console.log(isWin)
    // console.log(acceptStake)
    // console.log(refundStake)
    // console.log(_chip)
    // console.log(winloss)
    // console.log(balanceAfterSettle)
    // console.log("---------")
    await uiUtils.shouldBeEqual(await GameLobbyFunc.getBalance(), balanceAfterSettle)
}