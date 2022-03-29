import { memo, useState } from "react"
import { AddToWishListProps } from "./AddToProductWishList"
import dynamic from "next/dynamic"
import lodash from "lodash"

const AddToProductWishList = dynamic<AddToWishListProps>(
  () => {
    return import("./AddToProductWishList").then(
      (mod) => mod.AddToProductWishList
    )
  },
  {
    loading: () => <span>Carregando...</span>,
  }
)

type ProductType = {
  id: number
  price: number
  title: string
  priceFormatted: string
}

interface ProductItemProps {
  product: ProductType
  onAddToWishlist: (id: number) => void
}

const ProductItemComponent = ({
  product,
  onAddToWishlist,
}: ProductItemProps) => {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddToProductWishList
          onAddToWishList={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})

export { ProductItem }
