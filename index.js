const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
  console.log('started:', ctx.from.id)
  return ctx.reply('Welcome!')
})

bot.on('inline_query', ({ inlineQuery, answerInlineQuery }) => {
    let results = [];
    const kirpichLetters = ['с', 'к'];
    if (inlineQuery.query != '') {
        results = kirpichLetters.map(letter => {
            let kirpichResult = inlineQuery.query.replace(/([ауоыиэяюёе])/g, '$1' + letter + '$1');
            console.log(kirpichResult);
            return {
                type: 'article',
                id: letter,
                title: kirpichResult,
                input_message_content: {
                    message_text: kirpichResult
                }
            };
        })        
    }

    return answerInlineQuery(results/*, {cache_time: 0}*/)
});

//bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))

bot.startPolling()