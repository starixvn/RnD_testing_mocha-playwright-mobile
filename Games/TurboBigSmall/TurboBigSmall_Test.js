const game = "TurboBigSmall"
const addContext = require('mochawesome/addContext')
import * as MemberSiteFunc from '../References/MemberSite_Function'
import * as TurboBigSmallFunc from './TurboBigSmall_Function'

describe('TurboBigSmall Game Mobile',()=>{

    before(async function(){
        await MemberSiteFunc.Login(game)
        await TurboBigSmallFunc.verifyLoginSuccessfully()
        await TurboBigSmallFunc.scrollToGame()
        await TurboBigSmallFunc.onQuickBet()
    }) 
    afterEach(async function(){
        if(this.currentTest.state == 'failed'){
            var __filename = this.currentTest.title.trim()
            await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
            addContext(this,`./Pictures/${game}_${__filename}.png` )
        }
    })
    // it('TC001_Full_Smoke_Verify Time of Balancing Betting Pool', async () => {
    //     await TurboBigSmallFunc.verifyBetAtTimeOfBalancingBettingPool()
    // })
    
    it('TC002_Full_Smoke_Verify Bet choices', async()=>{
        await TurboBigSmallFunc.verifyBetChoices()
    })

    it('TC003_Full_Smoke_Verify Betting', async()=> {
        const Choice = ['Big','Small']
        const Chip = [1,5,10,50,100,200,500,1000,2000]
        for(const chip of Chip) {
            for(const choice of Choice) {
                await TurboBigSmallFunc.waitToNextRound()
                await TurboBigSmallFunc.verifyPlaceBet(choice,chip)
            }
        }
    })
    it('TC004_Full_Smoke_Verify Min Max Bet', async()=> {
        await TurboBigSmallFunc.verifyMaxBet()
    })
    it('TC005_Full_Smoke_Verify can bet only one choice in a round', async()=> {
        await TurboBigSmallFunc.verifyCanBetOnlyOneChoiceInARound()
    })
    it('TC006_Full_Smoke_Verify Betting when 1-Click OFF', async() => {
        await TurboBigSmallFunc.offQuickBet()
        const Choice = ['Big','Small']
        for(const choice of Choice) {
            await TurboBigSmallFunc.waitToNextRound()
            await TurboBigSmallFunc.verifyPlaceBet(choice,1)
        }
        await TurboBigSmallFunc.onQuickBet()
    })
    it('TC007_Full_Smoke_Verify Statistic',async() =>{
        await TurboBigSmallFunc.verifyStatisticBroad()
    })
    it('TC008_Full_Smoke_Verify Settlement & Game History',async() =>{
        const Choice = ['Big','Small']
        const Chip = [1,5,10,50,100,200,500,1000,2000]
        await TurboBigSmallFunc.waitToNextRound()
        for(const chip of Chip) {
            for(const choice of Choice) {
                await TurboBigSmallFunc.verifySettleMentAndHistory(choice,chip)
            }
        }
    })
    it('TC009_Full_Smoke_Verify Result line tool tips', async() =>{
        await TurboBigSmallFunc.verifyLastRoundResult()
    })
    it('TC010_Full_Smoke_Verify Game Guide', async()=>{
        await TurboBigSmallFunc.verifyGuide()
    })

})
