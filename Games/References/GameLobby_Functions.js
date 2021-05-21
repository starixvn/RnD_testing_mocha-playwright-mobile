import { GameLobbyLocator } from "./GameLobby_Locator"
import * as uiUtils from  '../../utils/uiUtils'
import * as config from '../../config/config'
export const verifyLoginSuccessfully = async() => {
    try {
        await uiUtils.waitEl(GameLobbyLocator.Balance)
        return{ Val : true , Err : { IsErr : false , ErrMess : ""}}
    }
    catch (error){
        console.log(error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : error.message}}
    }
}

export const selectChip = async(_chip) => {
    // if(await isHideChipBroad() === true) {
    //     await expandChipBroad()
    // }
    await uiUtils.clickEl(GameLobbyLocator[`Chip${_chip}`])
    await verifyChipSelected(_chip)
    // await hideChipBroad()
}
export const swicthQuickBet = async(_state='on') => {
    // if(await isHideChipBroad() === true) {
    //     await expandChipBroad()
    // }
    let tmpOffset =  await uiUtils.getPropertyOfComputedStyle(GameLobbyLocator.QuickBet,GameLobbyLocator.ComputedStyle.QuickBet.attColor)
    if(_state === 'on'){
        // Check if state of QuickBet is off
        if(GameLobbyLocator.ComputedStyle.QuickBet.offColor === await tmpOffset){
            await uiUtils.clickEl(GameLobbyLocator.QuickBet)
            await uiUtils.clickEl(GameLobbyLocator.QuickBetAccept)
            // Verify QuickBet is on
            tmpOffset =  await uiUtils.getPropertyOfComputedStyle(GameLobbyLocator.QuickBet,GameLobbyLocator.ComputedStyle.QuickBet.attColor)
            await uiUtils.shouldBeEqual(await tmpOffset, GameLobbyLocator.ComputedStyle.QuickBet.onColor)
        } else {console.log("State of QuickBet is on")}
    } else {
        // Check if state of QuickBet is on
        if(GameLobbyLocator.ComputedStyle.QuickBet.onColor === await tmpOffset){
            await uiUtils.clickEl(GameLobbyLocator.QuickBet)
            // Verify QuickBet is off
            tmpOffset =  await uiUtils.getPropertyOfComputedStyle(GameLobbyLocator.QuickBet,GameLobbyLocator.ComputedStyle.QuickBet.attColor)
            await uiUtils.shouldBeEqual(await tmpOffset, GameLobbyLocator.ComputedStyle.QuickBet.offColor)
        } else {console.log("State of QuickBet is off")}
    }
    // await hideChipBroad()
}
export const hideChipBroad = async() => {
    await uiUtils.clickEl(GameLobbyLocator.CollapseChipBroad)
}
export const expandChipBroad = async() => {
    await uiUtils.clickEl(GameLobbyLocator.ExpandChipBroad)
}
export const isHideChipBroad = async() => {
    const el = await page.$$(GameLobbyLocator.secCheckCollapse)
    if(el.length === 4) return true
    return false
}
const verifyChipSelected = async(_chip) => {
    // if(await isHideChipBroad() === true) {
        // await uiUtils.shouldBeEqual(
        //     await uiUtils.getText(GameLobbyLocator.CollapseChipSelected),
        //     await uiUtils.convertChip(_chip)
        // )
    // } else {
        await uiUtils.shouldBeEqual(
            await uiUtils.getText(GameLobbyLocator.ExpandChipSelected),
            await uiUtils.convertChip(_chip)
        )
    // }
}
export const isOnQuickBet = async() => {
    // if(await isHideChipBroad() === true) {
    //     await expandChipBroad()
    // }
    let tmpOffset =  await uiUtils.getPropertyOfComputedStyle(GameLobbyLocator.QuickBet,GameLobbyLocator.ComputedStyle.QuickBet.attColor)
    // await hideChipBroad()
    if(await tmpOffset === GameLobbyLocator.ComputedStyle.QuickBet.onColor) return true
    return false
}
export const getBalance = async() => {
    return parseFloat(/([0-9,]+)/ig.exec(await uiUtils.getText(GameLobbyLocator.Balance))[1].replace(',',''))
}
export const placeBet = async(_elChoice,_elTime,_elOwnBet,_chip) => {
    await selectChip(_chip)
    let currentBalance = await getBalance()
    for( let i= 0; i < config.setting.loop; i++) {
        if(parseInt(await uiUtils.getText(_elTime)) > 7) {
            const flag = await isOnQuickBet()
            await uiUtils.clickEl(_elChoice)
            if(flag === false ) { 
                await uiUtils.clickEl(GameLobbyLocator.QuickBetAccept) 
            }
            i = config.setting.loop
        }
        await uiUtils.sleep(1000)
    }
    // Verify Bet success
    await uiUtils.shouldBeEqual(await uiUtils.getText(_elOwnBet), _chip.toString())
    await uiUtils.shouldBeEqual(currentBalance - _chip , await getBalance())
}

