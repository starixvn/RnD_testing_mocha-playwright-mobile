import { TurboBigSmallLocator } from './TurboBigSmall_Locator'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as uiUtils from '../../utils/uiUtils'
export const verifyPlaceBet = async(_choice,_chip) => {
    await GameLobbyFunc.verifyPlaceBet(TurboBigSmallLocator[`${_choice}`].Choice,TurboBigSmallLocator.Timer,TurboBigSmallLocator[`${_choice}`].OwnBet,_chip)
}
export const placeBet = async(_choice,_chip) => {
    await GameLobbyFunc.placeBet(TurboBigSmallLocator[`${_choice}`].Choice,TurboBigSmallLocator.Timer,_chip)
}
export const verifyLoginSuccessfully = async() => {
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.Title), TurboBigSmallLocator.VerifyText.vi.Title)
}

export const getRoundId = async() => {
    return await uiUtils.getText(TurboBigSmallLocator.RoundId)
}

export const waitToNextRound = async() => {
    return await uiUtils.waitToTime(TurboBigSmallLocator.Timer,'30')
}

export const isAvailableBet = async() => {
    return (parseInt(await uiUtils.TurboBigSmallLocator.Timer) > 7)
}
export const scrollToGame = async() => {
    await page.$eval(TurboBigSmallLocator.Title, (el) => el.scrollIntoView(false))
}

export const verifyTotalTimeOfARound = async() => {
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(TurboBigSmallLocator.Timer,'29'),true)
    const starttime = Date.now()
    // Wait to next Round
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(TurboBigSmallLocator.Timer,'30'),true)
    const endtime = Date.now()
    let t = Math.round((endtime - starttime)/1000)
    await uiUtils.shouldBeEqual(t === 36 || t === 37,true,`Verify total time of a round is 61s Failed, total time is: ${t}s`)
}
export const verifyBlockBettingTime = async() => {
    await GameLobbyFunc.placeBetAtBlockBettingTime(TurboBigSmallLocator.Timer,TurboBigSmallLocator.lblLockBet)
}
export const onQuickBet = async()=> {
    if(isQB === false) await GameLobbyFunc.swicthQuickBet() 
}
export const offQuickBet = async()=> {
    if(isQB === true) await GameLobbyFunc.swicthQuickBet("off") 
}
export const verifyBetAtTimeOfBalancingBettingPool = async() => {
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.lblBalanceBettingPool), TurboBigSmallLocator.VerifyText.vi.BalanceBettingPool)
}

export const verifyBetChoices = async() => {
    const Choice = ['Big','Small']
    for(let choice of Choice){
        await uiUtils.waitEl(TurboBigSmallLocator[`${choice}`].Choice)
        await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator[`${choice}`].Odds),"1:"+TurboBigSmallLocator.Odds.toString()) 
    }
}

export const verifyMaxBet = async() => {
    await GameLobbyFunc.selectChip(3000)
    const Choice = ['Big','Small']
    for(let choice of Choice){
        await waitToNextRound()
        await GameLobbyFunc.minMaxBet(TurboBigSmallLocator[`${choice}`].Choice,TurboBigSmallLocator.Timer,TurboBigSmallLocator.lblMessage,TurboBigSmallLocator.msgMaxRound)
    }

}
export const verifyCanBetOnlyOneChoiceInARound = async() => {
    await waitToNextRound()
    await uiUtils.sleep(3000)
    await verifyPlaceBet('Big',1)
    await placeBet('Small',1)
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.lblMessage),TurboBigSmallLocator.VerifyText.vi.OneChoiceInARound)
}

export const verifyStatisticBroad = async() => {
    // Wait to next Round
    await waitToNextRound()
    await uiUtils.sleep(3000)
    let siStatisticBroad = [0,0]
    const elStatisticBroad = await page.$$(TurboBigSmallLocator.StatisticScoreBoard)
    for(let i=0 ; i < elStatisticBroad.length; i++){
        if(await uiUtils.getText(`(${TurboBigSmallLocator.StatisticScoreBoard})[${i+1}]`) === "T") siStatisticBroad[0]++
        else siStatisticBroad[1]++
    }
    console.log(siStatisticBroad)
    // Verify Statistic
    // Tài
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(TurboBigSmallLocator.StatisticBig),
        parseInt((siStatisticBroad[0])/elStatisticBroad.length*100)+'%'
    )
    // Xỉu
    await uiUtils.shouldBeEqual(
        await uiUtils.getText(TurboBigSmallLocator.StatisticSmall),
        parseInt((siStatisticBroad[1])/elStatisticBroad.length*100)+'%'
    )
}

export const openGameHistory = async() => {
    await GameLobbyFunc.openHistory()
    await GameLobbyFunc.selectGameOnHistory("TurboBigSmall")
}
export const closeGameHistory = async() => {
    await GameLobbyFunc.closeHistory()
}
export const openGameGuide = async()=> {
    await GameLobbyFunc.openGuide()
    await GameLobbyFunc.selectGameOnGuide("TurboBigSmall")
}
export const closeGameGuide = async() => {
    await GameLobbyFunc.closeGuide()
}
export const verifyGuide = async()=> {
    await openGameGuide()
    const content = await uiUtils.getContentFrame(TurboBigSmallLocator.Guide.Frame, TurboBigSmallLocator.Guide.Text)
    await uiUtils.shouldBeEqual(content,TurboBigSmallLocator.VerifyText.vi.GuideContent)
    await closeGameGuide()
}


const clickRoundHistory = async(_roundid)=> {
    _roundid = _roundid.replace("#","")
    let _el = TurboBigSmallLocator.DotRoundHistory + _roundid + "']"
    await uiUtils.clickEl(_el)
}

export const verifyLastRoundResult = async()=> {
    // Wait to next Round
    await waitToNextRound()
    await uiUtils.sleep(3000)
    let roundId = await uiUtils.getText(TurboBigSmallLocator.RoundId)
    const Choice = ['Big','Small']
    let result=[0,0,0],resultRound
    // Wait to Result
    let tmp = "?" + roundId.replace("#","")
    result[0] = (await uiUtils.getAttribute(TurboBigSmallLocator.ResultDice.Dice1,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[1] = (await uiUtils.getAttribute(TurboBigSmallLocator.ResultDice.Dice2,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[2] = (await uiUtils.getAttribute(TurboBigSmallLocator.ResultDice.Dice3,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    resultRound = parseInt(await uiUtils.getText(TurboBigSmallLocator.ResultDice.Total))
    await uiUtils.sleep(3000)
    await clickRoundHistory(roundId)
    console.log(resultRound)

    let rsText = (resultRound > 10) ? TurboBigSmallLocator.VerifyText.vi.Big : TurboBigSmallLocator.VerifyText.vi.Small
    rsText += `(${result[0]}-${result[1]}-${result[2]})`

    // Verify Last RoundID
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.ToolTips.lblRound),roundId.toString())
    // Verify Result
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.ToolTips.lblTitle),rsText)

    return { dice:result, total:resultRound }
}

export const verifySettleMentAndHistory = async(_choice,_chip) => {
    await GameLobbyFunc.selectChip(_chip)
    let currentBalance =  await GameLobbyFunc.getBalance()
    console.log(currentBalance)
    await verifyPlaceBet(_choice,_chip)
    let roundId = await uiUtils.getText(TurboBigSmallLocator.RoundId)
    await uiUtils.shouldBeEqual(await GameLobbyFunc.getBalance(), currentBalance - _chip)
    currentBalance = await GameLobbyFunc.getBalance()

    let result=[0,0,0],resultRound
    let winloss, balanceAfterSettle
    // Wait to Result
    let tmp = "?" + roundId.replace("#","")
    result[0] = (await uiUtils.getAttribute(TurboBigSmallLocator.ResultDice.Dice1,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[1] = (await uiUtils.getAttribute(TurboBigSmallLocator.ResultDice.Dice2,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    result[2] = (await uiUtils.getAttribute(TurboBigSmallLocator.ResultDice.Dice3,"src")).toString().replace(`/static/images/bigsmall-dice-`,"").replace(".png","").replace(tmp,"")
    resultRound = parseInt(await uiUtils.getText(TurboBigSmallLocator.ResultDice.Total))
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
    await uiUtils.shouldBeEqual("#"+await uiUtils.getText(TurboBigSmallLocator.History.LastRound),roundId,"Verify Round Id is Failed")
    // result
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.History.LastResult),resultIndex,"Verify result is Failed")
    // Choice Option
    await uiUtils.shouldBeEqual(await uiUtils.getText(TurboBigSmallLocator.History.LastChoice),TurboBigSmallLocator.VerifyText.vi[`${_choice}`]+"@"+TurboBigSmallLocator.Odds,"Verify choice option is Failed")
    // Stake
    await uiUtils.shouldBeEqual((await uiUtils.getText(TurboBigSmallLocator.History.LastStake)).replace(',',''),_chip.toString(),"Verify stake is Failed")
    let refundStake = parseInt(await uiUtils.getText(TurboBigSmallLocator.History.LastRefund))
    console.log(refundStake)
    let acceptStake = _chip - refundStake
    console.log(acceptStake)
    if (isWin === true) {
        winloss = Math.round(((acceptStake * TurboBigSmallLocator.Odds) - acceptStake)*100)/100
        balanceAfterSettle = Math.round((currentBalance + refundStake + _chip + winloss)*100)/100
    } else {
        winloss = 0
        balanceAfterSettle = currentBalance + refundStake
    }
    console.log(balanceAfterSettle)
    // Winloss
    await uiUtils.shouldBeEqual((await uiUtils.getText(TurboBigSmallLocator.History.LastWinLoss)).replace(',',''),winloss.toString(),"Verify winloss is Failed")
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