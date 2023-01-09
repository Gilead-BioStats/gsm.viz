export default function fetchData(urls) {
    return Promise.all(urls
        .map(
            url => fetch(url).then(response => response.json())
        )
    );
}
