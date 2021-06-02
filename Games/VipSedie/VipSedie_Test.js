const game = "VipSedie"
const addContext = require('mochawesome/addContext')
import { waitToTime } from '../../utils/uiUtils'
import * as MemberSiteFunc from '../References/MemberSite_Function'
import * as VipSedieFunc from './VipSedie_Function'

describe('Vip Game Mobile',()=>{

    before(async function(){
        await MemberSiteFunc.Login(game)
        await VipSedieFunc.verifyLoginSuccessfully()
        await VipSedieFunc.scrollToGame()
    }) 
    afterEach(async function(){
        if(this.currentTest.state == 'failed'){
            var __filename = this.currentTest.title.trim()
            await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
            addContext(this,`./Pictures/${game}_${__filename}.png` )
        }
    })
    it('TC_001_Full_Smoke_Verify Time of a round', async () => {
        await VipSedieFunc.verifyTotalTimeOfARound()
        await VipSedieFunc.verifyShakingPlate()
    })  
    it('TC_002_Full_Smoke_Verify bet choies', async()=> {
        await VipSedieFunc.verifyBetChoices()
    })

    it('TC003_Full_Smoke_Verify Betting', async()=> {
        const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
        const Chip = [10,50,100,200,500,1000,2000,3000]
        for(const chip of Chip) {
            if(chip < 500) await VipSedieFunc.waitToNextRound()
            for(const choice of Choice) {
                if(chip >= 500) await VipSedieFunc.waitToNextRound()
                if(chip > 500) {
                    if(choice !== 'Red4' && choice !== 'White4') {
                        await VipSedieFunc.placeBet(choice,chip)
                    }
                } else{ 
                    await VipSedieFunc.placeBet(choice,chip)
                }
            }
        }
    })
    it('TC004_Full_Smoke_Verify betting at block betting time', async()=> {
        await VipSedieFunc.verifyBlockBettingTime()
    })

    it('TC_005_Full_Smoke_Verify betting at settlement time', async() => {
        await VipSedieFunc.verifyBettingAtSettleTime()
    })

    it('TC006_Full_Smoke_Verify Min Max Bet', async()=> {
        //Test
        await VipSedieFunc.verifyMinBet()
        await VipSedieFunc.verifyMaxBet()
    })

})