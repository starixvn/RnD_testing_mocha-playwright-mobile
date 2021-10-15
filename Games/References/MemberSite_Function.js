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
        let _requestjs = {"memberId": Number(config[_env].memberId[_game]),"memberName":"GJ62Pjtn","language":"vi-VN","currency":"$US","seq":"d,y,lumi","siteId":"4100300","siteName":"lumi","ip":"","AppType":2,"browserUserAgent": userAgent,"auth":{"clientId":"gamesimulator","clientSecret":"gamesimulator@20luminet&"},"token":null,"redirectUrl":"#","verifyResult":null,"gameId":0,"setting":{"owUrl":""},"domain":"example.com","localhost":null,"resource":null}
        let resToken = await chai.request(config[_env].url).post("/sso").send(_requestjs)
        let resSs = await chai.request(config[_env].proxy).get(`/user/auth/sso?token=${resToken.body.token}&system=2`).set("user-agent",userAgent)
        const obj = JSON.parse(resToken.text);
        console.log(obj.redirectUrl)
         await chai.request(config[_env].setBalance).post("/").set('content-type', 'application/x-www-form-urlencoded')
        .send(`ObCustId=${config[_env].memberId[_game]}&Balance=20000.00&MinBet=1.00&MaxBet=3000.00&Delay.GetBalance=0&Delay.PlaceBet=0&Delay.EndGame=0&Delay.GetBetLimit=0&ErrorCode.GetBalance=0&ErrorCode.PlaceBet=0&ErrorCode.EndGame=0&ErrorCode.GetBetLimit=0&__RequestVerificationToken=CfDJ8NJR82vR_UtHmvIkoBmdwR7_lNNt0xzsRguQk7UuNpfB2fTbZujU3blCQUcHI3xTLUUFo6343fSnLJvxjm102JfVu6zg_SuILb9CzWy_1Ap3cJFi0_-DY2rid5RftdDxnC_ssGpgRDFS5z5fmy-BryU`)
        let _requestChk = {"session": resSs.body.ss, "username": `gamesimulator_${config[_env].memberId[_game]}`, "browserUserAgent":userAgent}
        let _resCheckAuth = await chai.request(config[_env].proxy).post(`/user/auth/authorize`).set("Host",config[env].proxy).set("Content-Type","application/json;charset=UTF-8")
        .set("Origin",config[env].origin).set("User-Agent",userAgent).send(_requestChk)
        if(_resCheckAuth.body.user === null){
            // register if don't have account on user
            let _requestSignIn = {"avatar": 17,"browserUserAgent": userAgent,"nickname": `RT${config[_env].memberId[_game]}`,"session": resSs.body.ss,"username": `gamesimulator_${config[_env].memberId[_game]}`}
            await chai.request(config[_env].proxy).post('/user/auth/signName').set("user-agent",userAgent).send(_requestSignIn)
        }
        
        // update lightmode for login
        let _mode = {"browserUserAgent":userAgent, "session": resSs.body.ss, "key":"theme","username": `gamesimulator_${config[_env].memberId[_game]}`,"value":"light"}
        await chai.request(config[_env].proxy).post("/user/users/settings/update").set("user-agent",userAgent).send(_mode)

        // skip Welcome Page if existed
        await uiUtils.navigate(obj.redirectUrl)
        // await skipWelcomePage()
    } catch (error) {
        console.error(error.message)
    }
}

// Login
export const Login = async(_game) => {
    // await wsHearMessageOff()
    let flag
    if(env !== 'cf_local' && env !== 'cf_local1' && env !== 'cf_local2') {
    } else {
        // Navigate Sabaclub from Simulator
        await login_local(env,_game)
    }
    // Verify go to Game Lobby Successfully
    flag = await GameLobbyFunc.verifyLoginSuccessfully()
    expect(flag.Val,"Fail on Login GameLobby").to.be.true
    await GameLobbyFunc.swicthQuickBet('on')
}

// skip Welcome Page if existed
export const skipWelcomePage = async() => {
    await GameLobbyFunc.skipWelcomePage()
}