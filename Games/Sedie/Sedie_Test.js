const game = "Sedie"
const addContext = require('mochawesome/addContext')
import * as MemberSiteFunc from '../References/MemberSite_Function'
import * as SedieFunc from './Sedie_Function'

describe('Sedie Mobile',()=>{

    before(async function(){
        await MemberSiteFunc.Login(game)
        await SedieFunc.verifyLoginSuccessfully()
        await SedieFunc.scrollToGame()
        await SedieFunc.onQuickBet()
    }) 
    afterEach(async function(){
        if(this.currentTest.state == 'failed'){
            var __filename = this.currentTest.title.trim()
            await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
            addContext(this,`./Pictures/${game}_${__filename}.png` )
        }
    })
    it('TC_001_Full_Smoke_Verify Time of a round', async () => {
        await SedieFunc.verifyTotalTimeOfARound()
    })  
    it('TC_002_Full_Verify bet choies', async()=> {
        await SedieFunc.verifyBetChoices()
    })

    it('TC_003_Full_Verify Betting', async()=> {
        const Choice = ['Even','Odd','Red4','Red3','Red2','White3','White4']
        const Chip = [1,5,10,50,100,200,1,500,1000,2000]
        for(const chip of Chip) {
            if(chip < 500) await SedieFunc.waitToNextRound()
            for(const choice of Choice) {
                if(chip >= 500) {
                    await SedieFunc.waitToNextRound()
                }
                if(chip > 500) {
                    if(choice !== 'Red4' && choice !== 'White4') {
                        await SedieFunc.verifyPlaceBet(choice,chip)
                    }
                } else{ 
                    await SedieFunc.verifyPlaceBet(choice,chip)
                }
            }
        }
    })
    it('TC_004_Full_Smoke_Verify betting at block betting time', async()=> {
        await SedieFunc.verifyBlockBettingTime()
    })


    it('TC_006_Full_Verify Min Max Bet', async()=> {
        await SedieFunc.verifyMaxBet()
    })

    it('TC_007_Full_Verify Max Per Round', async()=> {
        await SedieFunc.verifyMaxBetPerRound()
    })

    it('TC_008_Full_Smoke_Verify Settlement', async()=> {
        // Hard chip = 10
        await SedieFunc.verifySettlementForAllChoice(5)
    })

    it('TC_009_Full_Smoke_Verify Statistics', async()=> {
        await SedieFunc.verifyLastRoundResult()
        await SedieFunc.verifyStatisticBroad()
    })

    it('TC_010_Full_Smoke_Verify Game History', async()=> {
        // Hard Chip  = 10
        await SedieFunc.verifyHistory(5)
    })

    it('TC_011_Full_Verify Game Guide', async()=>{
        await SedieFunc.verifyGuide()
    })

})