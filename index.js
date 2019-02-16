let priceType = '';
let weaponType = '';
let mergedList = [];
let imgOHTribute = '';
let imgTHTribute = '';
let imgMHTribute = '';
let imgToken = '';

$(document).ready(() => {
    imgOHTribute = offHandShard[getRandom(0, offHandShard.length - 1)].img;
    imgTHTribute = twoHandsShard[getRandom(0, twoHandsShard.length - 1)].img;
    imgMHTribute = mainHandShard[getRandom(0, mainHandShard.length - 1)].img;
    imgToken = mapCurrency[getRandom(0, mapCurrency.length - 1)].img;
});

let getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


let weaponChange = (e) => {
    weaponType = e.value === '1' ? 'MainHand Weapon' : 'TwoHands Weapon';
    $('#resultTitle').text(weaponType);
    if (weaponType !== '' && priceType !== '') {
        countWeaponPrice(mergedList, priceType, weaponType);
    }
}

let priceChange = (e) => {
    priceType = e.value === 'BUY' ? 'buy' : 'order';
    getPrice(priceType);
}

let getPrice = (type) => {
    $.get(apiURL, (data) => {
        mergedList = tp.map((x) => {
            let p = data.filter(y => y.id === x.id)[0];
            return { name: x.name, img: x.img, buy: p.sells.unit_price, order: p.buys.unit_price, group: x.group };
        });
        listMatPrice(mergedList, type);
        if (weaponType !== '' && priceType !== '') {
            countWeaponPrice(mergedList, priceType, weaponType);
        }
    });
}

let listMatPrice = (data, type) => {
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

let countWeaponPrice = (data, price, weapon) => {
    // options: 1:290 2:4boxes 3:3boxes+65
    let ofh = { m: 70, w: 60 }; // offhand
    let mh = { m: 90, w: 90 }; // mainhand
    let th = { m: 110, w: 120 }; // twohands
    let cheapestTrophy = data.filter(x => x.group === 'trophy')
        .reduce((res, obj) => { return (obj[price] < res[price]) ? obj : res });
    let newPriceData = data.filter(x => x.group !== 'trophy').concat(cheapestTrophy);
    let ore = newPriceData.filter(x => x.name === 'Mithril Ore')[0];
    let wood = newPriceData.filter(x => x.name === 'Elder Wood Log')[0];
    let ecto = newPriceData.filter(x => x.name === 'Glob of Ectoplasm')[0];
    let orePrice = ore[price];
    let woodPrice = wood[price];
    let ectoPrice = ecto[price];
    let trophyPrice = cheapestTrophy[price];
    let oreImg = ore.img;
    let woodImg = wood.img;
    let ectoImg = ecto.img;
    let trophyImg = cheapestTrophy.img;

    let op1 = [];
    let op3 = [];

    if (weapon === 'TwoHands Weapon') {
        op1 = [
            { name: 'Mithril Ore', count: 290 * th.m, price: 290 * th.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 290 * th.w, price: 290 * th.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 290 * 35, price: 290 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Tribute', count: 290, price: 290 * 20, unit: 'token', img: imgTHTribute }
        ];
        op3 = [
            { name: 'Mithril Ore', count: 300 * ofh.m + 65 * th.m, price: 300 * ofh.m * orePrice + 65 * th.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 300 * ofh.w + 65 * th.w, price: 300 * ofh.w * woodPrice + 65 * th.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 365 * 35, price: 365 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Twohand Weapon Tribute', count: 300, price: 300 * 10, unit: 'token', img: imgTHTribute },
            { name: 'OffHand Weapon Tribute', count: 65, price: 65 * 15, unit: 'token', img: imgOHTribute },
            { name: 'Glob of Ectoplasm', count: 15, price: 15 * ectoPrice, unit: 'g', img: ectoImg },
            { name: 'Philosopher\'s Stone', count: 15, price: 1.5, unit: 'ss', img: stone },
            { name: 'Thermocatalytic Reagent', count: 15, price: 2244, unit: 'g', img: thermo },
        ];
    } else {
        op1 = [
            { name: 'Mithril Ore', count: 290 * mh.m, price: 290 * mh.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 290 * mh.w, price: 290 * mh.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 290 * 35, price: 290 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Tribute', count: 290, price: 290 * 15, unit: 'token', img: imgMHTribute }
        ];

        op3 = [
            { name: 'Mithril Ore', count: 300 * ofh.m + 65 * mh.m, price: 300 * ofh.m * orePrice + 65 * mh.m * orePrice, unit: 'g', img: oreImg },
            { name: 'Elder Wood Log', count: 300 * ofh.w + 65 * mh.w, price: 300 * ofh.w * woodPrice + 65 * mh.w * woodPrice, unit: 'g', img: woodImg },
            { name: cheapestTrophy.name, count: 365 * 35, price: 365 * 35 * trophyPrice, unit: 'g', img: trophyImg },
            { name: 'Mainhand Weapon Tribute', count: 300, price: 300 * 10, unit: 'token', img: imgMHTribute },
            { name: 'OffHand Weapon Tribute', count: 65, price: 65 * 15, unit: 'token', img: imgOHTribute },
            { name: 'Glob of Ectoplasm', count: 15, price: 15 * ectoPrice, unit: 'g', img: ectoImg },
            { name: 'Philosopher\'s Stone', count: 15, price: 1.5, unit: 'ss', img: stone },
            { name: 'Thermocatalytic Reagent', count: 15, price: 2244, unit: 'g', img: thermo },
        ];
    }

    // all the same 
    let op2 = [
        { name: 'Mithril Ore', count: 400 * ofh.m, price: 400 * ofh.m * orePrice, unit: 'g', img: oreImg },
        { name: 'Elder Wood Log', count: 400 * ofh.w, price: 400 * ofh.w * woodPrice, unit: 'g', img: woodImg },
        { name: cheapestTrophy.name, count: 400 * 35, price: 400 * 35 * trophyPrice, unit: 'g', img: trophyImg },
        { name: 'OffHand Weapon Tribute', count: 400, price: 400 * 10, unit: 'token', img: imgOHTribute },
        { name: 'Glob of Ectoplasm', count: 20, price: 20 * ectoPrice, unit: 'g', img: ectoImg },
        { name: 'Philosopher\'s Stone', count: 20, price: 2, unit: 'ss', img: stone },
        { name: 'Thermocatalytic Reagent', count: 20, price: 2992, unit: 'g', img: thermo },
    ];

    let option1 = {
        title: 'Option1',
        discription: `Craft 290 ${weaponType} shards. You have to buy 290 ${weaponType} tributes.`,
        result: op1
    };

    let option2 = {
        title: 'Option2',
        discription: 'Craft 4 Enormous Chest of Legendary Shards. You have to buy 400 Offhand Weapon tributes and will get 10 extra shards for no use.',
        result: op2
    };

    let option3 = {
        title: 'Option3',
        discription: `Craft 3 Enormous Chest of Legendary Shards and 65 shards. You have to buy 300 Offhand Weapon tributes and 65 ${weaponType} tributes.`,
        result: op3
    };

    let result = [option1, option2, option3];
    showResult(result);
}

let showResult = (result) => {
    let $detailView = $('#detailView');
    $detailView.empty();

    result.forEach((data, i) => {
        let sumGold = 0;
        let sumToken = 0;
        let totalMat = [];
        let matList = [];

        data.result.forEach((x, j) => {
            let p = '';
            let unit = x.unit;
            let price = x.price;

            if (unit === 'g') {
                let g = price > 10000 ? Math.floor(price / 10000) : 0;
                let s = price > 100 ? Math.floor((price % 10000) / 100) : 0;
                let c = price % 100;
                sumGold += price;
                p = g ? `${g}<img src='${gold}'>${s}<img src='${silver}'>${c}<img src='${copper}'>` : s ? `${s}<img src='${silver}'>${c}<img src='${copper}'>` : `${c}<img src='${copper}'>`;
            } else if (unit === 'token') {
                sumToken += price;
                p = `${price}<img src='${imgToken}'>`;
            } else if (unit === 'ss') {
                p = `${price}<img src='${ss}'>`;
                totalMat.push(p);
            }

            matList.push(`<li>${x.count} <img src='${x.img}'>${x.name} - ${p}</li>`);
        });
        totalMat.push(`${sumToken}<img src='${imgToken}'>`);
        totalMat.push(`${Math.floor(sumGold / 10000)}<img src='${gold}'>${Math.floor((sumGold % 10000) / 100)}<img src='${silver}'>${sumGold % 100}<img src='${copper}'>`); // calculate money

        $detailView.append(`<div><h3>${data.title}</h3><p>${data.discription}</p><div class="mainHand"><ul>${matList.join('')}</ul></div><p class='total'>Total: ${totalMat.join(',')}</p></div><br>`)
    });

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

let mapCurrency = [
    { name: 'Lump of Aurillium', img: 'https://wiki.guildwars2.com/images/thumb/1/14/Lump_of_Aurillium.png/20px-Lump_of_Aurillium.png' },
    { name: 'Airship Part', img: 'https://wiki.guildwars2.com/images/thumb/1/14/Airship_Part.png/20px-Airship_Part.png' },
    { name: 'Ley Line Crystal', img: 'https://wiki.guildwars2.com/images/thumb/b/b4/Ley_Line_Crystal.png/20px-Ley_Line_Crystal.png' },
    { name: 'Trade Contract', img: 'https://wiki.guildwars2.com/images/thumb/f/f4/Trade_Contract.png/20px-Trade_Contract.png' },
    { name: 'Unbound Magic', img: 'https://wiki.guildwars2.com/images/thumb/f/f5/Unbound_Magic.png/20px-Unbound_Magic.png' },
    { name: 'Volatile Magic', img: 'https://wiki.guildwars2.com/images/thumb/5/54/Volatile_Magic.png/20px-Volatile_Magic.png' }
];

let apiURL = 'https://api.guildwars2.com/v2/commerce/prices?ids=24282,24299,24341,24350,24356,24288,24294,19722,19700,19721';
let copper = 'https://wiki.guildwars2.com/images/e/eb/Copper_coin.png';
let silver = 'https://wiki.guildwars2.com/images/3/3c/Silver_coin.png';
let gold = 'https://wiki.guildwars2.com/images/d/d1/Gold_coin.png';
let ss = 'https://wiki.guildwars2.com/images/thumb/6/63/Spirit_Shard.png/20px-Spirit_Shard.png';
let thermo = 'https://wiki.guildwars2.com/images/thumb/5/53/Thermocatalytic_Reagent.png/20px-Thermocatalytic_Reagent.png';
let stone = 'https://wiki.guildwars2.com/images/thumb/b/b9/Philosopher%27s_Stone.png/20px-Philosopher%27s_Stone.png';