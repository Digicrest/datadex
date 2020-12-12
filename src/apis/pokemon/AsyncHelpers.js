export async function testFetchNews() {
    const url = 'https://www.pokemon.com/us/pokemon-news/rss'
    fetch(url).then(response => 
        console.log(response)
    )
}