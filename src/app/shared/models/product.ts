export interface Product {

  id?:number
  productName:string
  price: string
  image?: File | null
  measureName: string
  typeName: string
  cardImageBase64?: string
}
