const API_BASE = "https://open.api.nexon.com/mabinogi/v1";

/**
 * 공통 API 호출
 */
async function api(url) {

    const res = await fetch(API_BASE + url, {
        headers: {
            "x-nxopen-api-key": API_KEY
        }
    });

    if (!res.ok) {
        throw new Error(`API ERROR : ${res.status}`);
    }

    return await res.json();
}

/**
 * 아이템 이름 검색
 */
async function searchItem(keyword) {

    return await api(
        `/auction/keyword-search?keyword=${encodeURIComponent(keyword)}`
    );

}

/**
 * 경매장 등록 목록 조회
 */
async function auctionList(itemId) {

    return await api(
        `/auction/list?item_id=${itemId}`
    );

}

/**
 * 거래 내역 조회
 */
async function history(itemId) {

    return await api(
        `/auction/history?item_id=${itemId}`
    );

}
