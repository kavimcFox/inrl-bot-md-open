const speed = require('performance-now')
const Config = require('../config');
const got = require('got')
let mP3 = "https://i.imgur.com/FP0Lavx.mp4"
let jPg = "https://i.imgur.com/4rzJsNG.jpeg"
const { mensionMp3, mensionImg } = require('../media/mension/setmension');
const {getVar}=require('./database/variable');
const axios = require('axios');
const cheerio = require('cheerio');
async function IsMension(m, conn){
if(!m.isGroup) return;
const { quoted } = require('./database/semifunction/is_ext');
const { contact } = await quoted(m);
let IsOwner, IsSudo, Owner, Sudo
let NewMension = ["94715168503", "94715168503"],MENSION_DATA;
let IsBot = conn.user.jid.split('@')[0];
NewMension.push(IsBot);
	let data = await getVar();
	let {OWNER,SUDO,MENSION_TEXT,MENSION_IMG, MENSION_AUDIO} = data.data[0];
  if(MENSION_AUDIO){
    let {body} = await got(MENSION_AUDIO.trim());
    mP3 = body.replaceAll(' ','')
  }
  if(MENSION_IMG){
    let {body} = await got(MENSION_IMG.trim());
    jPg = body.replaceAll(' ','')
    }
	if(!OWNER.includes(',')){
		NewMension.push(OWNER.trim())
		} else if(OWNER.includes(',')){
		Owner = OWNER.split(',');
		NewMension = Owner.concat(NewMension)
		};
		if(!SUDO.includes(',')){
		NewMension.push(SUDO.trim());
		} else if(SUDO.includes(',')){
		Sudo = SUDO.split(',');
		NewMension = Sudo.concat(NewMension)
		};
		MENSION_DATA = MENSION_TEXT;
let matchs = m.client.displayText?.replaceAll(' ','') ||'inrl', isTrue = false;
NewMension.map(async(cc)=>{
if(!matchs.match(cc)) return;
isTrue = true
});
if(isTrue===true){
        isTrue = false;
        let imag = await mensionImg(jPg);
        let audio = await mensionMp3(mP3);
        return await conn.sendMessage(m.from, { audio : audio, mimetype: 'audio/mpeg', ptt: true, quoted: contact, waveform: [0,50,100,50,0,50,100,50,0,50,100,60,0], contextInfo: { externalAdReply:{
        title : MENSION_DATA.split(',')[0],
        body : MENSION_DATA.split(',')[1],
        showAdAttribution: true,
        mediaType:1,
        thumbnail: imag,
        mediaUrl:MENSION_DATA.split(',')[2], 
        sourceUrl:MENSION_DATA.split(',')[2] }}}, {quoted: contact })
        }
}
function stickersearch(text) {
		return new Promise((resolve, reject) => {
			axios.get(`https://getstickerpack.com/stickers?query=${text}`)
				.then(({data}) => {
					const $ = cheerio.load(data)
					const source = []
					const link = [];
					var	ya = $('#stickerPacks > div > div:nth-child(3) > div > a').text()
		if (!ya ) return resolve()
					$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
						source.push($(b).attr('href'))
					})
					axios.get(source[Math.floor(Math.random() * source.length)])
						.then(({
							data
						}) => {
							const $$ = cheerio.load(data)
							$$('#stickerPack > div > div.row > div > img').each(function(c, d) {
								link.push($$(d).attr('src').replace(/&d=200x200/g,''))
							})
							result = {
								title: $$('#intro > div > div > h1').text(),
								sticker_url: link
							}
							resolve(result)
						})
				}).catch(reject)
		})
	}

module.exports = { IsMension, stickersearch }
