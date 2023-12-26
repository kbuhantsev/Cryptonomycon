const API_KEY = '1d68e619b5bfcbe62eccb05a765d39972fa55fffdb2b47ca8b6183aed20fe071'

export const loadTickers = (tickers) => {
  return fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${tickers.join(
      ','
    )}&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) =>
      Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, 1 / value]))
    )
}
