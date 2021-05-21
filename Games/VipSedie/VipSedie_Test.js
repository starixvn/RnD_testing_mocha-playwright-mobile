const game = "VipSedie"
const addContext = require('mochawesome/addContext')
import * as uiUtils from '../../utils/uiUtils'
import * as MemberSiteFunc from '../References/MemberSite_Function'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as VipSedieFunc from './VipSedie_Function'

describe('Vip Game Mobile',()=>{

    before(async function(){
        await MemberSiteFunc.Login(game)
        await VipSedieFunc.scrollToGame()
    }) 
    afterEach(async function(){
        if(this.currentTest.state == 'failed'){
            var __filename = this.currentTest.title.trim()
            await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
            addContext(this,`./Pictures/${game}_${__filename}.png` )
        }
    })
    it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
        console.log("Test")
        await GameLobbyFunc.swicthQuickBet()
        await VipSedieFunc.placeBet("Odd",10)
        // console.log("A")
        await uiUtils.sleep(30000)
        // await VipSedieFunc.verifyeSettlement("Red3", 10)
        // console.log("B")
        // await VipSedieFunc.verifyStatisticBroad()
    })  
})