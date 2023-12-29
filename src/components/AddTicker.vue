<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"> Тикер </label>
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            v-on:keydown.enter="add(undefined)"
            @input="handleTickerInput"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          v-for="coin in helpTickers"
          :key="coin.Id"
          class="flex bg-white p-1 rounded-md shadow-md flex-wrap"
        >
          <span
            @:click="handleHelpTickerClick(coin)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ coin.Symbol }}
          </span>
        </div>
        <div :class="{ invisible: !helpTickersError }" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
      </div>
    </div>
    <add-button @click="add()" type="button" class="my-4" />
  </section>
</template>

<script>
import AddButton from './AddButton.vue'

export default {
  components: {
    AddButton
  },

  data() {
    return {
      ticker: '',
      coins: [],
      helpTickers: [],
      helpTickersError: false
    }
  },

  mounted() {
    const getCoins = async () => {
      const resp = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?summary=true')
      const result = await resp.json()
      this.coins = Object.values(result.Data)
    }
    getCoins()
  },

  methods: {
    add() {
      const currentTicker = {
        name: this.ticker,
        price: '-',
        intervalId: null
      }

      const founded = this.coins.find((coin) => {
        return coin.Symbol.toLowerCase() === currentTicker.name.toLowerCase()
      })
      if (!founded) {
        alert('No such coin!')
        return
      }

      this.$emit('add-ticker', this.ticker)
      this.ticker = ''
      this.helpTickers = []
    },

    handleTickerInput(event) {
      this.helpTickersError = false
      const inputData = event.target.value.toLowerCase()
      if (inputData.length === 0) {
        this.helpTickers = []
        return
      }
      const values = this.coins.filter((obj) => obj.Symbol.toLowerCase().includes(inputData))
      this.helpTickers = values.slice(0, 4)
    },

    handleHelpTickerClick(coin) {
      //   const ticker = this.tickers.find(
      //     (value) => value.name.toLowerCase() === coin.Symbol.toLowerCase()
      //   )
      //   if (ticker) {
      //     this.helpTickersError = true
      //   } else {
      //     this.add(coin.Symbol)
      //   }
      this.ticker = coin.Symbol
      this.add()
    }
  }
}
</script>
