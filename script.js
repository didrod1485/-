const itemList = document.getElementById("itemList");
const loading = document.getElementById("loading");
const search = document.getElementById("search");

let recipes = [];

// 시작
async function init() {
    await loadRecipes();
    await updateAuctionPrices();
    render(recipes);
}

// recipes.json 읽기
async function loadRecipes() {
    const res = await fetch("recipes.json");
    recipes = await res.json();
}

// API에서 최저가 가져오기
async function getLowestPrice(category, itemName) {

    const data = await getAuctionList(category, itemName);

    if (!data.auction_item || data.auction_item.length === 0) {
        return 0;
    }

    let lowest = data.auction_item[0].auction_price_per_unit;

    data.auction_item.forEach(item => {

        if (item.auction_price_per_unit < lowest) {
            lowest = item.auction_price_per_unit;
        }

    });

    return lowest;
}

// recipes에 있는 모든 아이템 가격 업데이트
async function updateAuctionPrices() {

    for (const item of recipes) {

        try {

            item.sellPrice = await getLowestPrice(
                item.category,
                item.name
            );

        } catch (e) {

            console.error(item.name, e);

            item.sellPrice = 0;

        }

    }

}

// 화면 출력
function render(list) {

    loading.style.display = "none";

    itemList.innerHTML = "";

    list.forEach(item => {

        const card = document.createElement("div");

        card.className = "card";

        const profit = (item.sellPrice || 0) - (item.cost || 0);

        card.innerHTML = `
            <div class="itemName">${item.name}</div>

            <div class="row">
                <span class="label">제작비</span>
                <span class="value">${number(item.cost)}</span>
            </div>

            <div class="row">
                <span class="label">최저가</span>
                <span class="value">${number(item.sellPrice)}</span>
            </div>

            <div class="row">
                <span class="label">순이익</span>
                <span class="value ${profit >= 0 ? "profit" : "loss"}">
                    ${number(profit)}
                </span>
            </div>
        `;

        itemList.appendChild(card);

    });

}

// 숫자 포맷
function number(v) {
    return Number(v || 0).toLocaleString();
}

// 검색
search.addEventListener("input", () => {

    const keyword = search.value.trim();

    const result = recipes.filter(item =>
        item.name.includes(keyword)
    );

    render(result);

});

init();
