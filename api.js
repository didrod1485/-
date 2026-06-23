const API_URL = "https://open.api.nexon.com/mabinogi/v1";

async function request(url){

    const res = await fetch(API_URL + url,{

        headers:{
            "x-nxopen-api-key":API_KEY
        }

    });

    if(!res.ok){

        throw new Error(await res.text());

    }

    return await res.json();

}

async function getAuctionList(category,itemName,cursor=""){

    let url=
    `/auction/list?auction_item_category=${encodeURIComponent(category)}&item_name=${encodeURIComponent(itemName)}`;

    if(cursor){

        url+=`&cursor=${cursor}`;

    }

    return await request(url);

}
