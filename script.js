const itemList = document.getElementById("itemList");
const loading = document.getElementById("loading");
const search = document.getElementById("search");

let recipes = [];
let items = [];

async function init() {
    await loadRecipes();
    render(recipes);
}

async function loadRecipes() {
    const res = await fetch("recipes.json");
    recipes = await res.json();
}

function render(list) {

    loading.style.display = "none";

    itemList.innerHTML = "";

    list.forEach(item=>{

        const card=document.createElement("div");

        card.className="card";

        const profit=(item.sellPrice||0)-(item.cost||0);

        card.innerHTML=`

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
                <span class="value ${profit>=0?'profit':'loss'}">
                ${number(profit)}
                </span>
            </div>

        `;

        itemList.appendChild(card);

    });

}

function number(v){

    return Number(v||0).toLocaleString();

}

search.addEventListener("input",()=>{

    const keyword=search.value.trim();

    const result=recipes.filter(x=>x.name.includes(keyword));

    render(result);

});

init();
