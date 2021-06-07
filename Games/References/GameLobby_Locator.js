const path = require('path')
export const GameLobbyLocator = {
    Balance : "[class*='header_balance']",
    Username : "//div[@class='user-name']/span[2]",
    QuickBet : "//label[contains(@for,'quickbet')]", //  stuck
    QuickBetCancel : "button[class*='btn-grey']",
    QuickBetAccept : "button[class*='btn-orange']",
    Chip1 : "[data-index='0']",
    Chip5 : "[data-index='1']",
    Chip10 : "[data-index='2']",
    Chip50 : "[data-index='3']",
    Chip100 : "[data-index='4']",
    Chip200 : "[data-index='5']",
    Chip500 : "[data-index='6']",
    Chip1000 : "[data-index='7']",
    Chip2000 : "[data-index='8']",
    Chip3000 : "[data-index='9']",
    secCheckCollapse : "//div[contains(@class,'bet-setting_bet-settings')]/div/div/div",
    CollapseChipBroad : "span[class*=bet-setting_collapse]",
    ExpandChipBroad : "span[class*=bet-setting_expand]",
    // CollapseChipSelected: "[class*='bet-setting_number']",
    ExpandChipSelected : "//div[contains(@class,'chip_selected')]//div[contains(@class,'chip_number')]",
    ComputedStyle : {
        QuickBet : {
            attColor : 'background-image',
            offColor : 'linear-gradient(90deg, rgb(173, 173, 173), rgb(216, 216, 216) 64.29%)',
            onColor : 'linear-gradient(90deg, rgb(16, 156, 51), rgb(57, 234, 102) 64.29%)'
        }
    },
    Message : {
        betOnNextRound : "Vui lòng đặt cược ở phiên sau.",
        stopPlaceBet : "Dừng nhận cược",
    }
}