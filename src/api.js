const API_KEY = '1d68e619b5bfcbe62eccb05a765d39972fa55fffdb2b47ca8b6183aed20fe071'

const tickers = new Map()

export const loadTickers = (tickers) => {
  return fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(
      ','
    )}&tsyms=USD&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) =>
      Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, 1 / value.USD]))
    )
}

export const subscribeToTicker = (ticker, callback) => {
  const subscribers = tickers.get(ticker) || []
  tickers.set(ticker, [...subscribers, callback])
}

export const unsubscribeFromTicker = (ticker, callback) => {
  const subscribers = tickers.get(ticker) || []
  tickers.set(
    ticker,
    subscribers.filter((fn) => fn !== callback)
  )
}
