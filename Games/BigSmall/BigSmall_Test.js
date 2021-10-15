const game = "BigSmall"
const addContext = require('mochawesome/addContext')
import * as MemberSiteFunc from '../References/MemberSite_Function'
import * as BigSmallFunc from './BigSmall_Function'

describe('BigSmall Game Mobile',()=>{

    before(async function(){
        await MemberSiteFunc.Login(game)
        await BigSmallFunc.verifyLoginSuccessfully()
        await BigSmallFunc.scrollToGame()
        await BigSmallFunc.onQuickBet()
    }) 
    afterEach(async function(){
        if(this.currentTest.state == 'failed'){
            var __filename = this.currentTest.title.trim()
            await page.screenshot({ path: `./Report/Pictures/${game}_${__filename}.png`});
            addContext(this,`./Pictures/${game}_${__filename}.png` )
        }
    })
    // it('TC001_Full_Smoke_Verify Time of Balancing Betting Pool', async () => {
    //     await BigSmallFunc.verifyBetAtTimeOfBalancingBettingPool()
    // })
    
    it('TC002_Full_Smoke_Verify Bet choices', async()=>{
        await BigSmallFunc.verifyBetChoices()
    })

    it('TC003_Full_Smoke_Verify Betting', async()=> {
        const Choice = ['Big','Small']
        const Chip = [1,5,10,50,100,200,500,1000,2000]
        for(const chip of Chip) {
            for(const choice of Choice) {
                await BigSmallFunc.waitToNextRound()
                await BigSmallFunc.verifyPlaceBet(choice,chip)
            }
        }
    })
    it('TC004_Full_Smoke_Verify Min Max Bet', async()=> {
        await BigSmallFunc.verifyMaxBet()
    })
    it('TC005_Full_Smoke_Verify can bet only one choice in a round', async()=> {
        await BigSmallFunc.verifyCanBetOnlyOneChoiceInARound()
    })
    it('TC006_Full_Smoke_Verify Betting when 1-Click OFF', async() => {
        await BigSmallFunc.offQuickBet()
        const Choice = ['Big','Small']
        const Chip = [1,5,10,50,100,200,500,1000,2000]
        for(const chip of Chip) {
            for(const choice of Choice) {
                await BigSmallFunc.waitToNextRound()
                await BigSmallFunc.verifyPlaceBet(choice,chip)
            }
        }
        await BigSmallFunc.onQuickBet()
    })
    it('TC007_Full_Smoke_Verify Statistic',async() =>{
        await BigSmallFunc.verifyStatisticBroad()
    })
    it('TC008_Full_Smoke_Verify Settlement & Game History',async() =>{
        const Choice = ['Big','Small']
        await BigSmallFunc.waitToNextRound()
        for(const choice of Choice) {
            await BigSmallFunc.verifySettlementAndHistory(choice,1)
        }
    })
    it('TC009_Full_Smoke_Verify Result line tool tips', async() =>{
        await BigSmallFunc.verifyLastRoundResult()
    })
    it('TC010_Full_Smoke_Verify Game Guide', async()=>{
        await BigSmallFunc.verifyGuide()
    })

})
