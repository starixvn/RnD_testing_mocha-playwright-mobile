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
        const cflang = process.env.npm_config_cf_lang=='en'?'en-US':'vi-VN'
        let gameid = config.setting.gameIdlocal[_game]
        let _requestjs = 
        {"obCustId":Number(config[_env].memberId[_game]),"memberName":"Mp0LFZap","language":cflang,"currency":"$US","seq":"d,y,lumi","siteId":"4100300","siteName":"lumi","ip":"10.0.0.142","browserUserAgent":userAgent,"auth":{"partnerId":pid,"partnerSecret":`${pid}@20luminet&`},"token":null,"redirectUrl":"#","verifyResult":null,"gameId":gameid,"setting":{"apiUrl":"http://l1_game_api_local_1:5000","authUrl":"http://l1_auth_api_local_1:5000","client":{"id":"game-server","secret":"gameserver@20luminet&"},"expireIn":1637569728,"useAuthenticate":true,"requestTimeout":10000,"owUrl":"https://l1-ows1.lumigame.com/SabaClub/CreateCustomer","localhost":"http://localhost:7456","mobileLocalhost":"http://localhost:3000","port":5000},"domain":"example.com","localhost":null,"appType":2,"partner":"1W","resource":null}
        let res= await chai.request(config[_env].url).post("/sso").send(_requestjs)
        let obj = new Object()
        await console.log(res.text,res.status);
        if(res.status != 200) {
            await utils.sleep(10000)
            await console.log('re-sso');
            res= await chai.request(config[_env].url).post("/sso").send(_requestjs)
        }
        obj = await JSON.parse(res.text)
        await uiUtils.navigate(obj.redirectUrl)
       
       
        // let resToken = await chai.request(config[_env].url).post("/sso").send(_requestjs)
        // let resSs = await chai.request(config[_env].proxy).get(`/user/auth/sso?token=${resToken.body.token}&system=2`).set("user-agent",userAgent)
        // const obj = JSON.parse(resToken.text);
        // console.log(obj.redirectUrl)
        //  await chai.request(config[_env].setBalance).post("/").set('content-type', 'application/x-www-form-urlencoded')
        // .send(`ObCustId=${config[_env].memberId[_game]}&Balance=20000.00&MinBet=1.00&MaxBet=3000.00&Delay.GetBalance=0&Delay.PlaceBet=0&Delay.EndGame=0&Delay.GetBetLimit=0&ErrorCode.GetBalance=0&ErrorCode.PlaceBet=0&ErrorCode.EndGame=0&ErrorCode.GetBetLimit=0&__RequestVerificationToken=CfDJ8NJR82vR_UtHmvIkoBmdwR7_lNNt0xzsRguQk7UuNpfB2fTbZujU3blCQUcHI3xTLUUFo6343fSnLJvxjm102JfVu6zg_SuILb9CzWy_1Ap3cJFi0_-DY2rid5RftdDxnC_ssGpgRDFS5z5fmy-BryU`)
        // let _requestChk = {"session": resSs.body.ss, "username": `gamesimulator_${config[_env].memberId[_game]}`, "browserUserAgent":userAgent}
        // let _resCheckAuth = await chai.request(config[_env].proxy).post(`/user/auth/authorize`).set("Host",config[env].proxy).set("Content-Type","application/json;charset=UTF-8")
        // .set("Origin",config[env].origin).set("User-Agent",userAgent).send(_requestChk)
        // if(_resCheckAuth.body.user === null){
        //     // register if don't have account on user
        //     let _requestSignIn = {"avatar": 17,"browserUserAgent": userAgent,"nickname": `RT${config[_env].memberId[_game]}`,"session": resSs.body.ss,"username": `gamesimulator_${config[_env].memberId[_game]}`}
        //     await chai.request(config[_env].proxy).post('/user/auth/signName').set("user-agent",userAgent).send(_requestSignIn)
        // }
        
        // // update lightmode for login
        // let _mode = {"browserUserAgent":userAgent, "session": resSs.body.ss, "key":"theme","username": `gamesimulator_${config[_env].memberId[_game]}`,"value":"light"}
        // await chai.request(config[_env].proxy).post("/user/users/settings/update").set("user-agent",userAgent).send(_mode)

        // // skip Welcome Page if existed
        // await uiUtils.navigate(obj.redirectUrl)
        //await skipWelcomePage()
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