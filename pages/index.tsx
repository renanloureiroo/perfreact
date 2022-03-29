import type { NextPage } from "next"
import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults"

type Product = {
  id: number
  price: number
  title: string
}

type ProductFormatted = {
  id: number
  price: number
  title: string
  priceFormatted: string
}

type Results = {
  totalPrice: number
  data: ProductFormatted[]
}

const Home: NextPage = () => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  })

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault()

    if (!search.trim()) return

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data: Product[] = await response.json()

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    const products: ProductFormatted[] = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      }
    })
    const totalPrice = data.reduce((total: number, product: Product) => {
      return total + product.price
    }, 0)

    setResults({
      totalPrice,
      data: products,
    })
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results?.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  )
}

export default Home
