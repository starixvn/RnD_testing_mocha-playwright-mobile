export const setting = {
    browser: 'chromium',
    viewport: {
       // UI
       width : 1280,
       height : 720
   },
   timeout : 60000,
   loop : 90,
   headless: false,
}

export const Translate = {
   Rebet : {
      vi : "Cược lại",
      en : "Rebet"
   },
   History : {
      vi : "Lịch sử"
   },
   Result : {
      vi : "Kết quả"
   },
   Guide : {
      vi : "Hướng dẫn"
   }
}

export const cf_local ={
   url: "https://gamelobby-simulator.lumigame.com/signin",
   usernameSSO: "",
   memberId: {
        BlackJack : "1001080",
        Sedie : "1001081",
        VipSedie : "1001082",
        Sicbo:  "1001083",
        Keno:  "1001084",
        Baccarat:  "1001085",
        Roulette:  "1001086",
        BigSmall : "1001087",
        MiniSedie: "1001088",
        TurboBigSmall: "1001089",
        TurboOddEven: "1001090",
        SedieWar: "1001091"
   },
   password: "",
   gamelobbyurl: "",
   retrieveEndGame : "https://owapi-simulator.lumigame.com/SabaClub/RetrieveEndGameInfo",
   setBalance : "https://owapi-simulator.lumigame.com/SabaClub/CreateCustomer"
}

export const cf_local1 ={
   url: "https://l1-glbs1.lumigame.com/signin",
   usernameSSO: "",
   memberId: {
        BlackJack : "1001080",
        Sedie : "1001081",
        VipSedie : "1001082",
        Sicbo:  "1001083",
        Keno:  "1001084",
        Baccarat:  "1001085",
        Roulette:  "1001086",
        BigSmall : "1001087",
        MiniSedie: "1001088",
        TurboBigSmall: "1001089",
        TurboOddEven: "1001090",
        SedieWar: "1001091"
   },
   password: "",
   gamelobbyurl: "",
   retrieveEndGame : "https://l1-ows1.lumigame.com/SabaClub/RetrieveEndGameInfo",
   setBalance : "https://l1-ows1.lumigame.com/SabaClub/CreateCustomer"
}

export const cf_local2 ={
   url: "https://l1-glbs2.lumigame.com/signin",
   usernameSSO: "",
   memberId: {
        BlackJack : "1001080",
        Sedie : "1001081",
        VipSedie : "1001082",
        Sicbo:  "1001083",
        Keno:  "1001084",
        Baccarat:  "1001085",
        Roulette:  "1001086",
        BigSmall : "1001087",
        MiniSedie: "1001088",
        TurboBigSmall: "1001089",
        TurboOddEven: "1001090",
        SedieWar: "1001091"
   },
   password: "",
   gamelobbyurl: "",
   retrieveEndGame : "https://l1-ows2.lumigame.com/SabaClub/RetrieveEndGameInfo",
   setBalance : "https://l1-ows2.lumigame.com/SabaClub/CreateCustomer"
}

export const cf_sit ={
   url: "http://demo:one23@qawer.playthefun.com:5068/login",
   username: {
       BlackJack : "supertestsaba66",
       Sedie : "supertestsaba67",
       VipSedie : "supertestsaba68",
       Sicbo:  "supertestsaba69",
       Keno:  "supertestsaba70",
       Baccarat:  "supertestsaba71",
       Roulette:  "supertestsaba72",
       BigSmall : "supertestsaba73",
       MiniSedie: "supertestsaba74",
       TurboBigSmall: "supertestsaba75",
       TurboOddEven: "supertestsaba76"
   },
   password: "1234aaAA",
   gamelobbyurl: "/VendorGame/OpenSabaClubLobby",
   urlWebsocket: "wss://uatproxy.sabagame.com/sit/roulette/socket.io/?EIO=3&transport=websocket",
   urlOrigin: "https://sit.sabagame.com",
   protocol: "wss"
}

// export const cf_uat ={
//     url: "http://demo:one23@qawer.viva88.com:6100/Login/",
//     username: {
//         Sedie: "IT57Test789"
//     },
//     password: "1234aaAA",
//     gamelobbyurl: "/VendorGame/OpenSabaClub?GameID=0",
//     urlWebsocket: "ws://haproxy.lumigame.com:7002/roulette/socket.io/?EIO=3&transport=websocket",
//     urlOrigin: "http://l1-games1.lumigame.com"
// }

// export const cf_prod ={
//     env: "uaprot",
//     url: "",
//     username: "",
//     password: ""
// }
