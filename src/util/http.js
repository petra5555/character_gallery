const URL = "https://rickandmortyapi.com/api/character/";

export async function searchCharacters(value) {
    const response = await fetch(`${URL}?name=${value}`);
    const responseData = await response.json();

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Oops! We couldn't find a character with that name.");
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    }

    return responseData;
}

export async function fetchNextPage(url) {
    if (url) {
        const response = await fetch(url);
        const responseData = await response.json();

        if (!response.ok) throw new Error("Failed to fetch next page");

        return responseData;
    }
}