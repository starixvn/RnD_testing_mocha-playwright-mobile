import * as config from '../config/config'
import * as GameLobbyFunc from '../Games/References/GameLobby_Functions'

export const navigate = async(_url)=> {
        // Go to Page
        try {
            await page.goto(_url, { timeout : config.setting.timeout})
            await page.waitForTimeout(500)
        } catch (error) {
            console.error(error.message)
            await shouldBeEqual(true,false,"Timeout - navigate this page")
        }
}
export const waitForLoadState = async()=> {
        // Wait Page Load
        try {
            await page.waitForLoadState('load', { timeout : config.setting.timeout })
         } catch (error) {
            console.error(error.message);
            // this.screenFail()
            await shouldBeEqual(true,false,"Timeout - wait for load event to be fired")
         }
}
export const waitEl = async(_el,_state='visible')=> {
        // Wait Element 
        try {
            return await page.waitForSelector( _el, { timeout : config.setting.timeout, state : _state})
         } catch (error) {
            console.error(error.message);
            // this.screenFail()
            await shouldBeEqual(true,false,`Timeout - wait for Selector can be visible`)
         }  
}
export const clickEl= async(_el)=> {
        // Click Element
        try {
            await page.waitForSelector(_el, { timeout : config.setting.timeout})
            await page.click(_el)
            await page.waitForTimeout(500)
         } catch (error) {
            console.error(error.message);
            // this.screenFail()
            await shouldBeEqual(true,false,"Error - click Element")
         }
}
export const sendKeys = async(_el,_val)=> {
        // Send message to Element
        try {
            await page.waitForSelector(_el, { timeout : config.setting.timeout })
            await page.fill(_el, _val.toString())
        } catch (error) {
            console.error(error.message);
            // this.screenFail()
            await shouldBeEqual(true,false,"Error - send keys")
        }
}
export const getText = async(_el)=> {
        // Get Text
        try {
            await page.waitForSelector(_el, { timeout : config.setting.timeout })
            return await (await page.innerText(_el)).toString()
        } catch (error) {
            console.error(error.message);
            // this.screenFail()
            await shouldBeEqual(true,false,"Error - get Text")
        }
}
export const getAttribute = async(_el, _val) => {
        try {
            await page.waitForSelector(_el, { timeout : config.setting.timeout })
            return await (await page.getAttribute(_el, _val, { timeout : config.setting.timeout })).toString()
        } catch (error) {
            console.error(error.message);
            // this.screenFail()
            await shouldBeEqual(true,false,"Error - get Attribute")
        }
}
export const verifyTitle = async(_title) => {
        // Verify Title
        try {
            await waitForLoadState()
            let _act_title = await page.title()
            if(_act_title == _title) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            return { Val : false , Err : { IsErr : false , ErrMess : ""}}
        }  catch (error) {
            console.log('Error '+error.message)
            return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
        }
}
export const selectDrp = async(_el, _val) => {
        // Select Dropdown List
        try {
            await page.waitForSelector(
                _el, { state: 'attached'}
            )
            await page.selectOption(_el, { value : _val })
        }  catch (error) {
            console.log('Error '+error.message)
            await shouldBeEqual(true,false,"Error - select item on dropdown list")
        }
}
export const shouldBeEqual = async(_val,_expect,_mess="") => {
    global.expect(_val,_mess).to.equal(_expect) 
}
export const switchTabs = async(_index) => {
    // Switch tab
    try {
        await page.waitForTimeout();
        page = await pages[_index]
        await page.bringToFront()
    } catch (error) {
        console.log('Error '+error.message)
        await shouldBeEqual(true,false,"Error - switch Tab")
    }
}
export const swipe = async(__el,__tx, _ty,) => {
    // swipe to left ( fy-ty < 0 ) or right ( fy-ty >0 )
    try {
        const { x, y } = await (await page.$(__el)).boundingBox();
        await page.mouse.move(x,  y)
        await page.mouse.down();
        await sleep(500)
        await page.mouse.move(x + __tx,y + _ty)
        await sleep(1000)
        await page.mouse.up()
    } catch (error) {
        console.log('Error '+error.message)
    }
}
export const isTextNotEqualOnElement = async(_el, _strCompare) => {
    // Verify text is not equal strCompare
    try {
        let loop = true;
        while(loop){
            if(await getText(_el) != _strCompare) return { Val : true , Err : { IsErr : false , ErrMess : ""}}
            setTimeout(() => { 
                loop = false
              }, config.setting.timeout);
        }
        return { Val : false , Err : { IsErr : false , ErrMess : ""}}
    } catch (error) {
        console.log('Error '+error.message)
        return { Val : false , Err : { IsErr : true , ErrMess : "Error: "+ error.message}}
    }
}
export const sleep = async(_milliseconds) => {
    try {
        await page.waitForTimeout(_milliseconds)
    } catch (error) {
        console.log('Error '+error.message)
    }
}
export const getPropertyOfComputedStyle = async (_el,_att) => {
    const element = await waitEl(_el);
    return await element.evaluate((el,_att) => {
        return window.getComputedStyle(el).getPropertyValue(_att)
    },[_att])
}
export const convertChip = async(_chip) =>{
    if(_chip/1000 >=1) return (_chip/1000).toString() + 'k'
    else return _chip.toString()
}

export const waitToTime = async(_elTimer,_time) => {
    for(let i = 0 ; i < config.setting.loop; i++){
        if(_time.toString() === await getText(_elTimer)) return true
        await sleep(1000)
    }
    return false
}

export const isWin = async(_elChoice) => {
    let tmp = await getAttribute(_elChoice,'class')
    return await tmp.includes('winning')
}

export const getContentFrame = async(_iframe,_el) => {
    const content = await (await page.frame(_iframe)).textContent(_el)
    return content
}
export const returnMainPage = async() => {
    await page.mainFrame()
}