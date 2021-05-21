const game = "Sedie"
const addContext = require('mochawesome/addContext')
import * as uiUtils from '../../utils/uiUtils'
import * as MemberSiteFunc from '../References/MemberSite_Function'
import * as GameLobbyFunc from '../References/GameLobby_Functions'
import * as SedieFunc from './Sedie_Function'

describe('Sedie Game Mobile',()=>{

    before(async function(){
        await MemberSiteFunc.Login(game)
    }) 
    afterEach(async function(){
        if(this.currentTest.state == 'failed'){
            var __filename = this.currentTest.title.trim()
            await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
            addContext(this,`./Pictures/${game}_${__filename}.png` )
        }
    })
    it('TC_001_Full_Smoke_Verify can open game by click on game icon at the lobby', async () => {
        // console.log("Test")
        await GameLobbyFunc.swicthQuickBet()
        // console.log("a")
        await SedieFunc.placeBet("Odd",10)
        // await uiUtils.sleep(5000)
        // await SedieFunc.verifyeSettlement("Red3", 5)
        // await SedieFunc.verifyStatisticBroad()
    })  
})