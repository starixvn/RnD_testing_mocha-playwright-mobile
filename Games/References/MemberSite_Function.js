import { MemberSiteLocator } from './MemberSite_Locator'
import * as GameLobbyFunc from './GameLobby_Functions'
import * as config from '../../config/config'
import * as uiUtils from '../../utils/uiUtils'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const expect = chai.expect

//Login for local
export const login_local = async(_env,_game) => {
    try{
        let _requestjs = {"memberId": Number(config[_env].memberId[_game]),"memberName":"GJ62Pjtn","language":"vi-VN","currency":"$US","seq":"d,y,lumi","siteId":"4100300","ip":"","isMobi":true,"browserUserAgent": userAgent,"auth":{"clientId":"gamesimulator","clientSecret":"gamesimulator@20luminet&"},"token":null,"redirectUrl":"#","verifyResult":null,"gameId":0,"setting":{"owUrl":""},"domain":"example.com","localhost":null,"resource":null}
        chai.request(config[_env].url).post("/sso").send(_requestjs).end( async(err,res)=>{
            expect(res).to.have.status(200)
            const obj = JSON.parse(res.text);
            await uiUtils.navigate(obj.redirectUrl)
        })
        await uiUtils.sleep(7000)//Wait for login process
    } catch (error) {
        console.error(error.message)
    }
}

// Login
export const Login = async(_game) => {
    // await wsHearMessageOff()
    let flag
    if(env !== 'cf_local' && env !== 'cf_local1') {
        // // Login Member Site
        // await login(,_game)
        // // Navigate Sabaclub
        // await navigate(page.url().toString().replace(/\/[Ss]ports/g,'')+config[env].gamelobbyurl)
    } else {
        // Navigate Sabaclub from Simulator
        await login_local(env,_game)
    }
    // Verify go to Game Lobby Successfully
    flag = await GameLobbyFunc.verifyLoginSuccessfully()
    expect(flag.Val,"Fail on Login GameLobby").to.be.true
}