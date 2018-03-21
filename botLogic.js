const Telegraf = require('telegraf')
const SegmentAnalytics = require('analytics-node');

const bot = new Telegraf(process.env.BOT_TOKEN)
const segmentClient = new SegmentAnalytics(process.env.SEGMENT_KEY, { flushAt: process.env.SEGMENT_FLUSH_AT });

bot.start((ctx) => {
    segmentClient.identify({ 
        userId: ctx.from.id.toString(),
        traits: ctx.from
    });

    const Telegram = require('telegraf/telegram')
    const telegram = new Telegram(process.env.BOT_TOKEN);

    return telegram.getMe().then((info) => {
        return ctx.reply([
            'Привет! С этим инлайн-ботом ты сможешь быстро отправить кирпичный или соленый текст своему собеседнику. ',
            'Для этого напиши @' + info.username + ' в поле ввода и далее текст. В результате бот предложит ',
            'кирпичный и соленый варианты для твоего текста на выбор. Дерзай :)'].join(''))
        }
    );
})

bot.on('inline_query', (ctx) => {
    let inlineQuery = ctx.inlineQuery;
    let answerInlineQuery = ctx.answerInlineQuery;
    let results = [];
    if (inlineQuery.query != '') {
        segmentClient.track({ 
            event: 'InlineQuery', 
            userId: ctx.from.id.toString(),
            properties: {
                query: inlineQuery.query
            }
        });

        const kirpichLetters = ['с', 'к'];
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

bot.on('chosen_inline_result', (ctx) => {
    segmentClient.track({ 
        event: 'ChosenInlineResult', 
        userId: ctx.from.id.toString(),
        properties: {
            result_id: ctx.chosenInlineResult.result_id,
            query: ctx.chosenInlineResult.query
        }
    });
});

//bot.command('help', (ctx) => ctx.reply('Try send a sticker!'))

bot.startPolling()