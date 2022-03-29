import { ProductItem } from "./ProductItem"
import { List, ListRowRenderer } from "react-virtualized"

interface SearchResultsProps {
  results: Array<{
    id: number
    price: number
    title: string
    priceFormatted: string
  }>
  onAddToWishlist: (id: number) => void
  totalPrice: number
}

const SearchResults = ({
  results,
  onAddToWishlist,
  totalPrice,
}: SearchResultsProps) => {
  const rowRender: ListRowRenderer = ({ key, index, style }) => {
    return (
      <div key={key}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        width={900}
        rowHeight={30}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />
      {/* {!!results &&
        results.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        ))} */}
    </div>
  )
}

export { SearchResults }
