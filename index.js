$(document).ready(() => {
    $('#detailView').hide();
});

let radioChange = (e) => {
    let priceType = e.value === 'BUY' ? 'buy' : 'order';
    $('#detailView').show();
    getPrice(priceType)
}

let getPrice = (type) => {
    $.get(postURl, (data) => {
        let mergedList = tp.map((x) => {
            let p = data.filter(y => y.id === x.id)[0];
            return { name: x.name, img: x.img, buy: p.sells.unit_price, order: p.buys.unit_price, group: x.group };
        });
        listPrice(mergedList, type);
        countPrice(mergedList, type);
    });
}

let listPrice = (data, type) => {
    let $ul = $('#priceList').find('ul');
    $ul.empty();
    data.forEach((x, i) => {
        let price = x[type];
        let priceImg = '';
        if (price > 10000) {
            g = Math.floor(price / 10000);
            s = Math.floor((price % 10000) / 100);
            c = price % 100;
            priceImg = `${g}<img src='${silver}'>${s}<img src='${c}'>`;
        } else if (price > 100) {
            priceImg = `${Math.floor(price / 100)}<img src='${silver}'>${price % 100}<img src='${copper}'>`;
        } else {
            priceImg = `${price}<img src='${copper}'>`;
        }

        $ul.append(`<li><img src='${x.img}'>${x.name} - ${priceImg}</li>`);
    });
}

let countPrice = (data, type) => {
    // options: 1:290 2:4boxes 3:3boxes+65
    let ofh = { m: 70, w: 60 }; // offhand
    let mh = { m: 90, w: 90 }; // mainhand
    let th = { m: 110, w: 120 }; // twohands
    let cheapestTrophy = data.filter(x => x.group === 'trophy')
        .reduce((res, obj) => { return (obj[type] < res[type]) ? obj : res });

    let newPriceData = data.filter(x => x.group !== 'trophy').concat(cheapestTrophy);

    let ore = newPriceData.filter(x => x.name === 'Mithril Ore')[0];
    let wood = newPriceData.filter(x => x.name === 'Elder Wood Log')[0];
    let ecto = newPriceData.filter(x => x.name === 'Glob of Ectoplasm')[0];
    let orePrice = ore[type];
    let woodPrice = wood[type];
    let ectoPrice = ecto[type];
    let trophyPrice = cheapestTrophy[type];
    let oreImg = ore.img;
    let woodImg = wood.img;
    let ectoImg = ecto.img;
    let trophyImg = cheapestTrophy.img;

    let option1 = {
        title: 'Option1',
        discription: 'Craft 290 mainhand/twohands shards. You have to buy 290 mainhand/twohands tributes.',
        mainHand: [
            { name: 'Mithril Ore', count: 290 * mh.m, price: 290 * mh.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 290 * mh.w, price: 290 * mh.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 290 * 35, price: 290 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Map Token', count: 290, price: 290 * 15, unit: 'token', img: token }
        ],
        twoHands: [
            { name: 'Mithril Ore', count: 290 * th.m, price: 290 * th.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 290 * th.w, price: 290 * th.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 290 * 35, price: 290 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Map Token', count: 290, price: 290 * 20, unit: 'token', img: token }
        ]
    };


    let option2 = {
        title: 'Option2',
        discription: 'Craft 4 Enormous Chest of Legendary Shards. You have to buy 400 offhand tributes and will get 10 extra shards for no use.',
        mainHand: [
            { name: 'Mithril Ore', count: 400 * ofh.m, price: 400 * ofh.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 400 * ofh.w, price: 400 * ofh.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 400 * 35, price: 400 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Map Token', count: 400, price: 400 * 10, unit: 'token', img: token },
            { name: 'Glob of Ectoplasm', count: 20, price: 20 * ectoPrice, unit: 'g', img: ectoImg },
            { name: 'Philosopher\'s Stone', count: 20, price: 2, unit: 'ss', img: stone },
            { name: 'Thermocatalytic Reagent', count: 20, price: 2992, unit: 'g', img: thermo },
        ],
        twoHands: [
            { name: 'Mithril Ore', count: 400 * ofh.m, price: 400 * ofh.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 400 * ofh.w, price: 400 * ofh.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 400 * 35, price: 400 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Map Token', count: 400, price: 400 * 10, unit: 'token', img: token },
            { name: 'Glob of Ectoplasm', count: 20, price: 20 * ectoPrice, unit: 'g', img: ectoImg },
            { name: 'Philosopher\'s Stone', count: 20, price: 2, unit: 'ss', img: stone },
            { name: 'Thermocatalytic Reagent', count: 20, price: 2992, unit: 'g', img: thermo },
        ]
    };

    let option3 = {
        title: 'Option3',
        discription: 'Craft 3 Enormous Chest of Legendary Shards and 65 shards.Craft 3 Enormous Chest of Legendary Shards and 65 shards. You have to buy 300 offhand tributes and 65 mainhand/twohands tributes.',
        mainHand: [
            { name: 'Mithril Ore', count: 300 * ofh.m + 65 * mh.m, price: 300 * ofh.m * orePrice + 65 * mh.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 300 * ofh.w + 65 * mh.w, price: 300 * ofh.w * woodPrice + 65 * mh.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 365 * 35, price: 365 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Map Token', count: 365, price: 300 * 10 + 65 * 20, unit: 'token', img: token },
            { name: 'Glob of Ectoplasm', count: 15, price: 15 * ectoPrice, unit: 'g', img: ectoImg },
            { name: 'Philosopher\'s Stone', count: 15, price: 1.5, unit: 'ss', img: stone },
            { name: 'Thermocatalytic Reagent', count: 15, price: 2244, unit: 'g', img: thermo },
        ],
        twoHands: [
            { name: 'Mithril Ore', count: 300 * ofh.m + 65 * th.m, price: 300 * ofh.m * orePrice + 65 * th.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 300 * ofh.w + 65 * th.w, price: 300 * ofh.w * woodPrice + 65 * th.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 365 * 35, price: 365 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Map Token', count: 365, price: 300 * 10 + 65 * 20, unit: 'token', img: token },
            { name: 'Glob of Ectoplasm', count: 15, price: 15 * ectoPrice, unit: 'g', img: ectoImg },
            { name: 'Philosopher\'s Stone', count: 15, price: 1.5, unit: 'ss', img: stone },
            { name: 'Thermocatalytic Reagent', count: 15, price: 2244, unit: 'g', img: thermo },
        ]
    };

    let result = [option1, option2, option3];
    formatView(result, cheapestTrophy);
}

let formatView = (result, cheapestTrophy) => {
    let $detailView = $('#detailView');
    $detailView.empty();


    result.forEach((data, i) => {
     
        let sumMH = 0;
        let sumTH = 0;
        let totalMatMH = [];
        let totalMatTH = [];
        let matListMH = [];
        let matListTH = [];
        data.mainHand.forEach((x, i) => {
            let p = '';
            let unit = x.unit;
            let price = x.price;
            if (unit === 'g') {
                let g = price > 10000 ? Math.floor(price / 10000) : 0;
                let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
                let c = price % 100;
                sumMH += price;
                p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
            } else if (unit === 'token') {
                p = `${price}<img src='${token}'>`;
                totalMatMH.push(p);
            } else if (unit === 'ss') {
                p = `${price}<img src='${ss}'>`;
                totalMatMH.push(p);
            }

            matListMH.push(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
        });
        totalMatMH.push(`${Math.floor(sumMH / 10000)}<img src='${gold}'>${Math.floor((sumMH % 10000) / 100)}<img src='${silver}'>${sumMH % 100}<img src='${copper}'>`);

        data.twoHands.forEach((x, i) => {
            let p = '';
            let unit = x.unit;
            let price = x.price;
            if (unit === 'g') {
                let g = price > 10000 ? Math.floor(price / 10000) : 0;
                let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
                let c = price % 100;
                sumTH += price;
                p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
            } else if (unit === 'token') {
                p = `${price}<img src='${token}'>`;
                totalMatTH.push(p);
            } else if (unit === 'ss') {
                p = `${price}<img src='${ss}'>`;
                totalMatTH.push(p);
            }

            matListTH.push(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
        });
        totalMatTH.push(`${Math.floor(sumTH / 10000)}<img src='${gold}'>${Math.floor((sumTH % 10000) / 100)}<img src='${silver}'>${sumTH % 100}<img src='${copper}'>`);    

        $detailView.append(`<div><h3>${data.title}</h3><p>${data.discription}</p><div class="mainHand"><ul>${matListMH.join('')}</ul></div><p class='total'>Total: ${totalMatMH.join(',')}</p><br><div class="twoHands"><ul>${matListMH.join('')}</ul></div><p class='total'>Total:${totalMatTH.join(',')}</p></div><br>`)
    });
    /*
    let $op1mh = $('#option1 .mainHand');
    let $op1th = $('#option1 .twoHands');
    let $ul1m = $op1mh.find('ul');
    let $ul1t = $op1th.find('ul');
    $ul1m.empty();
    $ul1t.empty();
    let sum1mh = 0;
    let sum1th = 0;
    let total1m = [];
    let total1t = [];
    op1.mainHand.forEach((x, i) => {
        let p = '';
        let unit = x.unit;
        let price = x.price;
        if (unit === 'g') {
            let g = price > 10000 ? Math.floor(price / 10000) : 0;
            let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
            let c = price % 100;
            sum1mh += price;
            p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
        } else if (unit === 'token') {
            p = `${price}<img src='${token}'>`;
            total1m.push(p);
        }

        $ul1m.append(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
    });
    total1m.push(`${Math.floor(sum1mh / 10000)}<img src='${gold}'>${Math.floor((sum1mh % 10000) / 100)}<img src='${silver}'>${sum1mh % 100}<img src='${copper}'>`);
    $op1mh.find('div.total').html(total1m.join(','))

    op1.twoHands.forEach((x, i) => {
        let p = '';
        let unit = x.unit;
        let price = x.price;
        if (unit === 'g') {
            let g = price > 10000 ? Math.floor(price / 10000) : 0;
            let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
            let c = price % 100;
            sum1th += price;
            p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
        } else if (unit === 'token') {
            p = `${price}<img src='${token}'>`;
            total1t.push(p);
        }

        $ul1t.append(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
    });
    total1t.push(`${Math.floor(sum1th / 10000)}<img src='${gold}'>${Math.floor((sum1th % 10000) / 100)}<img src='${silver}'>${sum1th % 100}<img src='${copper}'>`);
    $op1th.find('div.total').html(total1t.join(','))


    let $op2mh = $('#option2 .mainHand');
    let $op2th = $('#option2 .twoHands');
    let $ul2m = $op2mh.find('ul');
    let $ul2t = $op2th.find('ul');
    $ul2m.empty();
    $ul2t.empty();
    let sum2mh = 0;
    let sum2th = 0;
    let total2m = [];
    let total2t = [];
    op2.mainHand.forEach((x, i) => {
        let p = '';
        let unit = x.unit;
        let price = x.price;
        if (unit === 'g') {
            let g = price > 10000 ? Math.floor(price / 10000) : 0;
            let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
            let c = price % 100;
            sum2mh += price;
            p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
        } else if (unit === 'token') {
            p = `${price}<img src='${token}'>`;
            total2m.push(p);
        } else if (unit === 'ss') {
            p = `${price}<img src='${ss}'>`;
            total2m.push(p);
        }

        $ul2m.append(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
    });
    total2m.push(`${Math.floor(sum2mh / 10000)}<img src='${gold}'>${Math.floor((sum2mh % 10000) / 100)}<img src='${silver}'>${sum2mh % 100}<img src='${copper}'>`);
    $op2mh.find('div.total').html(total2m.join(','))

    op2.twoHands.forEach((x, i) => {
        let p = '';
        let unit = x.unit;
        let price = x.price;
        if (unit === 'g') {
            let g = price > 10000 ? Math.floor(price / 10000) : 0;
            let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
            let c = price % 100;
            sum2th += price;
            p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
        } else if (unit === 'token') {
            p = `${price}<img src='${token}'>`;
            total2t.push(p);
        } else if (unit === 'ss') {
            p = `${price}<img src='${ss}'>`;
            total2t.push(p);
        }

        $ul2t.append(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
    });
    total2t.push(`${Math.floor(sum2th / 10000)}<img src='${gold}'>${Math.floor((sum2th % 10000) / 100)}<img src='${silver}'>${sum2th % 100}<img src='${copper}'>`);
    $op2th.find('div.total').html(total2t.join(','))

    let $op3mh = $('#option3 .mainHand');
    let $op3th = $('#option3 .twoHands');
    let $ul3m = $op3mh.find('ul');
    let $ul3t = $op3th.find('ul');
    $ul3m.empty();
    $ul3t.empty();
    let sum3mh = 0;
    let sum3th = 0;
    let total3m = [];
    let total3t = [];
    op3.mainHand.forEach((x, i) => {
        let p = '';
        let unit = x.unit;
        let price = x.price;
        if (unit === 'g') {
            let g = price > 10000 ? Math.floor(price / 10000) : 0;
            let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
            let c = price % 100;
            sum3mh += price;
            p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
        } else if (unit === 'token') {
            p = `${price}<img src='${token}'>`;
            total3m.push(p);
        } else if (unit === 'ss') {
            p = `${price}<img src='${ss}'>`;
            total3m.push(p);
        }

        $ul3m.append(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
    });
    total3m.push(`${Math.floor(sum3mh / 10000)}<img src='${gold}'>${Math.floor((sum3mh % 10000) / 100)}<img src='${silver}'>${sum3mh % 100}<img src='${copper}'>`);
    $op3mh.find('div.total').html(total3m.join(','))

    op3.twoHands.forEach((x, i) => {
        let p = '';
        let unit = x.unit;
        let price = x.price;
        if (unit === 'g') {
            let g = price > 10000 ? Math.floor(price / 10000) : 0;
            let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
            let c = price % 100;
            sum3th += price;
            p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
        } else if (unit === 'token') {
            p = `${price}<img src='${token}'>`;
            total3t.push(p);
        } else if (unit === 'ss') {
            p = `${price}<img src='${ss}'>`;
            total3t.push(p);
        }

        $ul3t.append(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
    });
    total3t.push(`${Math.floor(sum3th / 10000)}<img src='${gold}'>${Math.floor((sum3th % 10000) / 100)}<img src='${silver}'>${sum3th % 100}<img src='${copper}'>`);
    $op3th.find('div.total').html(total3t.join(','))
*/
}

let offHandShard = [
    { name: 'Shard of Friendship', url: 'https://wiki.guildwars2.com/wiki/Shard_of_Friendship', img: 'https://wiki.guildwars2.com/images/thumb/4/41/Shard_of_Friendship.png/20px-Shard_of_Friendship.png' },
    { name: 'Shard of Liturgy', url: 'https://wiki.guildwars2.com/wiki/Shard_of_Liturgy', img: 'https://wiki.guildwars2.com/images/thumb/4/4a/Shard_of_Liturgy.png/20px-Shard_of_Liturgy.png' },
    { name: 'Shard of the Dark Arts', url: 'https://wiki.guildwars2.com/wiki/Shard_of_the_Dark_Arts', img: 'https://wiki.guildwars2.com/images/thumb/6/6d/Shard_of_the_Dark_Arts.png/20px-Shard_of_the_Dark_Arts.png' },
    { name: 'Shard of Call of the Void', url: 'https://wiki.guildwars2.com/wiki/Shard_of_Call_of_the_Void', img: 'https://wiki.guildwars2.com/images/thumb/2/22/Shard_of_Call_of_the_Void.png/20px-Shard_of_Call_of_the_Void.png' }];

let mainHandShard = [
    { name: 'Shard of the Crown', url: 'https://wiki.guildwars2.com/wiki/Shard_of_the_Crown', img: 'https://wiki.guildwars2.com/images/thumb/b/b1/Shard_of_the_Crown.png/20px-Shard_of_the_Crown.png' },
    { name: 'Shard of Resolution', url: 'https://wiki.guildwars2.com/wiki/Shard_of_Resolution', img: 'https://wiki.guildwars2.com/images/thumb/2/20/Shard_of_Resolution.png/20px-Shard_of_Resolution.png' },
    { name: 'Shard of Tlehco', url: 'https://wiki.guildwars2.com/wiki/Shard_of_Tlehco', img: 'https://wiki.guildwars2.com/images/thumb/2/29/Shard_of_Tlehco.png/20px-Shard_of_Tlehco.png' },
    { name: 'Shard of Endeavor', url: 'https://wiki.guildwars2.com/wiki/Shard_of_EndeavorF', img: 'https://wiki.guildwars2.com/images/thumb/0/0e/Shard_of_Endeavor.png/20px-Shard_of_Endeavor.png' }
];

let twoHandsShard = [
    { name: 'Shard o\' War', url: 'https://wiki.guildwars2.com/wiki/Shard_o%27_War', img: 'https://wiki.guildwars2.com/images/thumb/2/23/Shard_o%27_War.png/20px-Shard_o%27_War.png' },
    { name: 'Shard of Arah', url: 'https://wiki.guildwars2.com/wiki/Shard_of_Arah', img: 'https://wiki.guildwars2.com/images/thumb/c/ca/Shard_of_Arah.png/20px-Shard_of_Arah.png' }
];

let tp = [
    { group: 'trophy', name: 'Potent Venom Sac', id: 24282, img: 'https://wiki.guildwars2.com/images/thumb/9/9a/Potent_Venom_Sac.png/20px-Potent_Venom_Sac.png' },
    { group: 'trophy', name: 'Intricate Totem', id: 24299, img: 'https://wiki.guildwars2.com/images/thumb/3/37/Intricate_Totem.png/20px-Intricate_Totem.png' },
    { group: 'trophy', name: 'Large Bone', id: 24341, img: 'https://wiki.guildwars2.com/images/thumb/0/0c/Large_Bone.png/20px-Large_Bone.png' },
    { group: 'trophy', name: 'Large Claw', id: 24350, img: 'https://wiki.guildwars2.com/images/thumb/c/ca/Large_Claw.png/20px-Large_Claw.png' },
    { group: 'trophy', name: 'Large Fang', id: 24356, img: 'https://wiki.guildwars2.com/images/thumb/4/4c/Large_Fang.png/20px-Large_Fang.png' },
    { group: 'trophy', name: 'Large Scale', id: 24288, img: 'https://wiki.guildwars2.com/images/thumb/f/f4/Large_Scale.png/20px-Large_Scale.png' },
    { group: 'trophy', name: 'Vial of Potent Blood', id: 24294, img: 'https://wiki.guildwars2.com/images/thumb/4/49/Vial_of_Potent_Blood.png/20px-Vial_of_Potent_Blood.png' },
    { group: 'mat', name: 'Elder Wood Log', id: 19722, img: 'https://wiki.guildwars2.com/images/thumb/a/a7/Elder_Wood_Log.png/20px-Elder_Wood_Log.png' },
    { group: 'mat', name: 'Mithril Ore', id: 19700, img: 'https://wiki.guildwars2.com/images/thumb/e/ee/Mithril_Ore.png/20px-Mithril_Ore.png' },
    { group: 'convert', name: 'Glob of Ectoplasm', id: 19721, img: 'https://wiki.guildwars2.com/images/thumb/9/9b/Glob_of_Ectoplasm.png/20px-Glob_of_Ectoplasm.png' }
]

let postURl = 'https://api.guildwars2.com/v2/commerce/prices?ids=24282,24299,24341,24350,24356,24288,24294,19722,19700,19721';
let copper = 'https://wiki.guildwars2.com/images/e/eb/Copper_coin.png';
let silver = 'https://wiki.guildwars2.com/images/3/3c/Silver_coin.png';
let gold = 'https://wiki.guildwars2.com/images/d/d1/Gold_coin.png';
let token = 'https://wiki.guildwars2.com/images/thumb/5/54/Volatile_Magic.png/20px-Volatile_Magic.png';
let ss = 'https://wiki.guildwars2.com/images/thumb/6/63/Spirit_Shard.png/20px-Spirit_Shard.png';
let thermo = 'https://wiki.guildwars2.com/images/thumb/5/53/Thermocatalytic_Reagent.png/20px-Thermocatalytic_Reagent.png';
let stone = 'https://wiki.guildwars2.com/images/thumb/b/b9/Philosopher%27s_Stone.png/20px-Philosopher%27s_Stone.png';