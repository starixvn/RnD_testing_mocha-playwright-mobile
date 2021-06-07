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
    it('TC001_Full_Smoke_Verify Time of a round', async () => {
        await VipSedieFunc.verifyTotalTimeOfARound()
        await VipSedieFunc.verifyShakingPlate()
    })  
    it('TC002_Full_Smoke_Verify bet choies', async()=> {
        await VipSedieFunc.verifyBetChoices()
    })

    it('TC003_Full_Smoke_Verify Betting', async()=> {
        const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
        const Chip = [10,50,100,200,500,1000,2000,3000]
        for(const chip of Chip) {
            if(chip < 500) await VipSedieFunc.waitToNextRound()
            for(const choice of Choice) {
                if(chip >= 500) {
                    await VipSedieFunc.waitToNextRound()
                }
                if(chip > 500) {
                    if(choice !== 'Red4' && choice !== 'White4') {
                        await VipSedieFunc.verifyPlaceBet(choice,chip)
                    }
                } else{ 
                    await VipSedieFunc.verifyPlaceBet(choice,chip)
                }
            }
        }
    })
    it('TC004_Full_Smoke_Verify betting at block betting time', async()=> {
        await VipSedieFunc.verifyBlockBettingTime()
    })

    it('TC005_Full_Smoke_Verify betting at settlement time', async() => {
        await VipSedieFunc.verifyBettingAtSettleTime()
    })

    it('TC006_Full_Smoke_Verify Min Max Bet', async()=> {
        await VipSedieFunc.verifyMinBet()
        await VipSedieFunc.verifyMaxBet()
    })

    it('TC007_Full_Smoke_Verify Max Per Round', async()=> {
        await VipSedieFunc.verifyMaxBetPerRound()
    })

    it('TC008_Full_Smoke_Verify Settlement', async()=> {
        // Hard chip = 10
        await VipSedieFunc.verifySettlementForAllChoice(10)
    })

    it('TC009_Full_Smoke_Verify Statistics', async()=> {
        await VipSedieFunc.verifyLastRoundResult()
        await VipSedieFunc.verifyStatisticBroad()
    })

    it('TC010_Full_Smoke_Verify Game History', async()=> {
        // Hard Chip  = 10
        await VipSedieFunc.verifyHistory(10)
    })

    it('TC011_Full_Smoke_Verify Game Guide', async()=>{
        await VipSedieFunc.verifyGuide()
    })

})