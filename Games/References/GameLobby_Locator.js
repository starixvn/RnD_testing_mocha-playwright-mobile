const path = require('path')
export const GameLobbyLocator = {
    Balance : "[class*='user-info_balance']",
    Username : "//div[@class='user-name']/span[2]",
    Logo : "//img[@alt='logo']",
    HeaderGame : "//div[contains(@class,'game-header_header-left')]",
    WelcomePage: "//div[contains(@class,'welcome')]",
    btnJoinLobby : "//button[contains(@class,'submit')]",
    QuickBet: {
        QuickBet : "//span[contains(@class,'quick-bet-modal_quick-bet-text')]",
        QuickBetAmount: "//div[contains(@class,'quick-bet-modal_group')]/input",
        QuickBetClearAmount : "//div[contains(@class,'quick-bet-modal_group')]/span",
        QuickBetButton: "//label[@for='toggle-quickbet']",
        QuickBetCancel : "button[class*='btn-grey']",
        QuickBetAccept : "button[class*='btn-orange']",
        ChipBroad: `[class="slick-slider slick-initialized"]`,
        QuickBetEnabled : "//div[contains(@class,'quick-bet-modal_quick-bet-active')]",
        QuickBetDisabled : "//img[@alt='icon-thunder']"
    },
    ChipLeftArrow : "//span[contains(@class,'chip-slider_icon-prev')]",
    Chip1 : "//span[contains(@class,'chip-slider')][text()='1']",
    Chip5 : "//span[contains(@class,'chip-slider')][text()='5']",
    Chip10 : "//span[contains(@class,'chip-slider')][text()='10']",
    Chip50 : "//span[contains(@class,'chip-slider')][text()='50']",
    Chip100 : "//span[contains(@class,'chip-slider')][text()='100']",
    Chip200 : "//span[contains(@class,'chip-slider')][text()='200']",
    Chip500 : "//span[contains(@class,'chip-slider')][text()='500']",
    Chip1000 : "//span[contains(@class,'chip-slider')][text()='1k']",
    Chip2000 : "//span[contains(@class,'chip-slider')][text()='2k']",
    Chip3000 : "//span[contains(@class,'chip-slider')][text()='3k']",
    ChipSelected : "//div[contains(@class,'chip-slider_selected')]",
    Menu : {
        Icon : "//div[contains(@class,'menu_game-menu')]",
        Guide : "//div[contains(@class,'menu_dropdown-item')][3]",
    },
    Hitory: {
        Icon : "//div[contains(@id,'ticket-history')]",
        SelectedGame : "//div[contains(@class,'game-selector_selector-container')]",
        Dropdown : {
            Sedie : "(//div[contains(@class,'game-selector_dropdown-item')])[2]",
            VipSedie : "(//div[contains(@class,'game-selector_dropdown-item')])[1]",
            BigSmall : "(//div[contains(@class,'game-selector_dropdown-item')])[4]",
            TurboBigSmall : "(//div[contains(@class,'game-selector_dropdown-item')])[5]"
        },
        Close : "//span[contains(@class,'icon-close')]" 
    },
    Guide: {
        SelectedGame : "//div[contains(@class,'game-selector_selector-container')]",
        Dropdown : {
            Sedie : "(//div[contains(@class,'game-selector_dropdown-item')])[2]",
            VipSedie : "(//div[contains(@class,'game-selector_dropdown-item')])[1]",
            BigSmall : "(//div[contains(@class,'game-selector_dropdown-item')])[4]",
            TurboBigSmall : "(//div[contains(@class,'game-selector_dropdown-item')])[5]"
        },
        Close : "//span[contains(@class,'icon-close')]"
    },
    secCheckCollapse : "//div[contains(@class,'bet-setting_bet-settings')]/div/div/div",
    CollapseChipBroad : "span[class*=bet-setting_collapse]",
    ExpandChipBroad : "span[class*=bet-setting_expand]",
    // CollapseChipSelected: "[class*='bet-setting_number']",
    ExpandChipSelected : "//div[contains(@class,'chip-slider_selected')]//span[contains(@class,'chip-slider_value')]",
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