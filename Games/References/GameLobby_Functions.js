import { GameLobbyLocator } from "./GameLobby_Locator"
import * as uiUtils from  '../../utils/uiUtils'
import * as config from '../../config/config'
export const verifyLoginSuccessfully = async() => {
    try {
        await uiUtils.waitEl(GameLobbyLocator.Balance)
        await uiUtils.sleep(5000)
        await expandAllGame()
        return{ Val : true , Err : { IsErr : false , ErrMess : ""}}
    }
    catch (error){
        console.log(error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : error.message}}
    }
}
const resetChip = async() => {
    while(await uiUtils.getText(GameLobbyLocator.ChipSelected) !== await uiUtils.getText(GameLobbyLocator.Chip1)){
        await uiUtils.clickEl(GameLobbyLocator.ChipLeftArrow)
    }
}
export const selectChip = async(_chip) => {
    // await openQuickBetGlobal()
    // await addPresetChip(_chip)
    // await saveQuickBetOption()
    await resetChip()
    if(await uiUtils.getText(GameLobbyLocator.ChipSelected) !== await uiUtils.getText(GameLobbyLocator[`Chip${_chip}`])){
        await uiUtils.clickEl(GameLobbyLocator[`Chip${_chip}`])
    }
    // await verifyChipSelected(_chip)

}
const clearPresetChip = async() =>{
    await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBetClearAmount)
}
const addPresetChip = async(_chip) => {
    // Clear PresetChip
    await clearPresetChip()
    await uiUtils.sleep(300)
    // Add Preset Chip
    let amount = _chip
    let t1 = 0
    let t = [0,0,0,0,0,0,0]
    let chip = [1000,500,200,100,50,10,5]
    for(let j = 0; j< chip.length;j++){
        if( amount >= chip[j]){
            t[j] = Math.floor(amount/chip[j])
            amount = amount - chip[j]*t[j]
        }
        // Click chip
        for( let i = 0;i < t[j]; i++){
            await uiUtils.clickEl(GameLobbyLocator.QuickBet[`PresetChip${chip[j]}`])
            await uiUtils.sleep(500)
        }
    }
    if(amount >= 1){
        t1 = amount
        // click +1
        for( let i = 0 ;i < t1; i++){
            await uiUtils.clickEl(GameLobbyLocator.QuickBet.PresetChip1)
            await uiUtils.sleep(500)
        }
    }
    // verify amount
    await uiUtils.shouldBeEqual((await uiUtils.getAttribute(GameLobbyLocator.QuickBet.QuickBetAmount,'value')).replace(',',''),_chip.toString())

}
const saveQuickBetOption = async() =>{
    await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBetAccept)
}
const openQuickBetGlobal = async() =>{
    await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBet)
}
const switchQB = async() =>{
    await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBetButton)
}
// Quick Bet Global
export const swicthQuickBet = async(_state='on',chip=1) => {
    // await openQuickBetGlobal()

    // get status of Quickbet
    let tmpOffset = await uiUtils.getPropertyOfComputedStyle(GameLobbyLocator.QuickBet.QuickBetButton,GameLobbyLocator.ComputedStyle.QuickBet.attColor)
    // await addPresetChip(chip)

    if(_state === 'on'){
        isQB = true
        // Check if state of QuickBet is off
        if(GameLobbyLocator.ComputedStyle.QuickBet.offColor === await tmpOffset){
            await switchQB()
            await saveQuickBetOption()
        }
    } else {
        isQB = false
        // Check if state of QuickBet is on
        if(GameLobbyLocator.ComputedStyle.QuickBet.onColor === await tmpOffset){
            await switchQB()
        }
    }
    // await saveQuickBetOption()
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
    return parseFloat(/([0-9,.]+)/ig.exec(await uiUtils.getText(GameLobbyLocator.Balance))[1].replace(',',''))
}
export const verifyPlaceBet = async(_elChoice,_elTime,_elOwnBet,_chip) => {
    await selectChip(_chip)
    let currentBalance
    for( let i= 0; i < config.setting.loop; i++) {
        await uiUtils.sleep(1000)
        if(parseInt(await uiUtils.getText(_elTime)) > 7) {
            currentBalance = await getBalance()
            await uiUtils.clickEl(_elChoice)
            if(isQB === false ) { 
                await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBetAccept) 
            }
            i = config.setting.loop
        }
    }
    await uiUtils.sleep(1000)
    // Verify Bet success
    await uiUtils.shouldBeEqual((await uiUtils.getText(_elOwnBet)).replace(',',''), _chip.toString())
    await uiUtils.shouldBeEqual(Math.round((currentBalance - _chip)*100)/100, await getBalance())
}
export const placeBet = async(_elChoice,_elTime,_chip,_adjTime = 7) => {
    await selectChip(_chip)
    for( let i= 0; i < config.setting.loop; i++) {
        await uiUtils.sleep(1000)
        if(parseInt(await uiUtils.getText(_elTime)) > _adjTime) {
            await uiUtils.clickEl(_elChoice)
            if(isQB === false ) { 
                await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBetAccept) 
            }
            i = config.setting.loop
        }
    }
}

export const minMaxBet = async(_elChoice,_elTime,_elWarning,_notice, _isMin = false) => {
    let loopBet = 1
    let _chip = 1
    if(_isMin === false) _chip = 3000
    if(_isMin === false) loopBet = 2
    for(let i=0; i < loopBet; i++) {
        await placeBet(_elChoice,_elTime,_chip,10)
        await uiUtils.sleep(500)
    }
    // Verify Warning Message
    await uiUtils.shouldBeEqual((await uiUtils.getText(_elWarning)).replace(',',''),_notice,`Don't see "${_notice}" messsage`)
}

export const placeBetAtBlockBettingTime = async (_elTime, _elBlockBet) => {
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(_elTime,'05'),true)
    await uiUtils.shouldBeEqual(await uiUtils.getText(_elBlockBet),GameLobbyLocator.Message.stopPlaceBet," Missing Block bet message")
}

export const placeBetOnSettleTime = async (_elChoice, _elTime, _elWarning) => {
    await uiUtils.shouldBeEqual(await uiUtils.waitToTime(_elTime,'01'),true)
    await uiUtils.clickEl(_elChoice)
    if(isQB === false ) { 
        await uiUtils.clickEl(GameLobbyLocator.QuickBet.QuickBetAccept) 
    }
    // Verify Warning Message
    await uiUtils.shouldBeEqual(await uiUtils.getText(_elWarning),GameLobbyLocator.Message.betOnNextRound,`Don't see "${GameLobbyLocator.Message.betOnNextRound}" messsage`)
}

export const verifyMaxPerRound = async(_elChoice1,_elChoice2,_elTime,_elWarning,_notice,_chip=2000)=> {
    await placeBet(_elChoice1,_elTime,_chip,15)
    await uiUtils.sleep(500)
    await placeBet(_elChoice2,_elTime,_chip)
    // Verify Warning Message
    await uiUtils.shouldBeEqual(await uiUtils.getText(_elWarning),_notice,`Don't see "${_notice}" messsage`)
}
export const selectMenu = async(_elMenu,_elOption,_elVerify,_txtVerify) => {
    await uiUtils.clickEl(_elMenu)
    await uiUtils.clickEl(_elOption)
    await uiUtils.shouldBeEqual(await uiUtils.getText(_elVerify),_txtVerify)
}

// skip Welcome page if existed
const isExistedWelcomePage = async() => {
    try {
        await page.waitForSelector(GameLobbyLocator.WelcomePage,{timeout: 5000})
        return true
    } catch {
        return false
    }
}
export const skipWelcomePage = async() => {
    await uiUtils.waitEl(GameLobbyLocator.Logo)
    if(await isExistedWelcomePage() === true ) await uiUtils.clickEl(GameLobbyLocator.btnJoinLobby)
}

export const expandAllGame = async() => {
    let loop = (await page.$$(GameLobbyLocator.HeaderGame)).length
    // console.log(loop)
    for(let i = 1 ; i < loop ; i++){
        let j = i+1
        await uiUtils.clickEl('('+GameLobbyLocator.HeaderGame+`)[${j}]`)
        await uiUtils.sleep(500)
    }
}
export const openHistory = async() => {
    await uiUtils.clickEl(GameLobbyLocator.Hitory.Icon)
}
export const closeHistory = async() =>{
    await uiUtils.clickEl(GameLobbyLocator.Hitory.Close)
}
export const selectGameOnHistory = async(game) => {
    await uiUtils.clickEl(GameLobbyLocator.Hitory.SelectedGame)
    await uiUtils.sleep(300)
    await uiUtils.clickEl(GameLobbyLocator.Hitory.Dropdown[`${game}`])
    await uiUtils.sleep(300)
}
export const openGuide = async() => {
    await uiUtils.clickEl(GameLobbyLocator.Menu.Icon)
    await uiUtils.sleep(300)
    await uiUtils.clickEl(GameLobbyLocator.Menu.Guide)
}
export const closeGuide = async() =>{
    await uiUtils.clickEl(GameLobbyLocator.Guide.Close)
}
export const selectGameOnGuide = async(game) => {
    await uiUtils.clickEl(GameLobbyLocator.Guide.SelectedGame)
    await uiUtils.sleep(300)
    await uiUtils.clickEl(GameLobbyLocator.Guide.Dropdown[`${game}`])
    await uiUtils.sleep(300)
}