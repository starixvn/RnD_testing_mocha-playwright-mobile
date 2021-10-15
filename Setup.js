import playwright from 'playwright'
import * as config from './config/config'
import uaParser from 'ua-parser-js'
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const expect = chai.expect

before(async () => {
    let context, device
    const args = await parseArg(process.env.npm_config_args)
    const mode = typeof process.env.npm_config_mode !== 'undefined' ? process.env.npm_config_mode : 'Emulator'
    if( mode !== 'Emulator') {
      [device] = await playwright._android.devices()
      await device.shell('am force-stop com.android.chrome');
      context = await device.launchBrowser()
    } else {
      device = (typeof args.device !== 'undefined') ? playwright.devices[args.device] : playwright.devices['iPad Mini']
      global.browser = await playwright.chromium.launch({
         headless: config.setting.headless ,
        //  args: ['--remote-debugging-port=9222'],
         args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu', '--use-gl=swiftshader','--enable-webgl']
        })
      context = await browser.newContext(device);
    }

    let page = await context.newPage()
    const getUA = await page.evaluate(() => navigator.userAgent);
    let pages = []
    pages.push(page)
    context.on('page', async(newPage)=>{
      pages.push(await newPage)
    })
    global.pages = pages
    global.userAgent = uaParser(getUA).ua;
    global.page = page
    global.context = context
    global.isHear = false
    global.balance = parseFloat("0.00")
    global.env = (typeof args.env !== 'undefined') ? args.env : 'cf_local'
    global.lang = (typeof args.lang !== 'undefined') ? args.lang : 'vi'
    global.theme = (typeof args.theme !== 'undefined') ? args.theme : 'light'
    global.expect = expect
    global.wsMessageReceived = []
    global.isQB = false
    // console.log(process.argv)
    
    
})

const parseArg = async(_args)=> {
  let p = _args.split("-")
  let args ={},tmp=[]
  for(let i=0 ; i< p.length ; i++){
      tmp = p[i].split("=")
      args[tmp[0]] = tmp[1]
  }
  return args
}