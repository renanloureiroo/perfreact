export interface AddToWishListProps {
  onAddToWishList: () => void
  onRequestClose: () => void
}

export const AddToProductWishList = ({
  onAddToWishList,
  onRequestClose,
}: AddToWishListProps) => {
  return (
    <span>
      Deseja adicionar ao favoritos?
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Não</button>
    </span>
  )
}
