export function addToCartrRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  }
}

export function addToCartSucess(id) {
  return {
    type: '@cart/ADD_SUCCESS',
    id,
  }
}

export function removeFromCart(id){
  return {
  type: '@cart/REMOVE',
  id,
}
}

export function updateAmount(id, amount) {
  return {
     type: '@cart/UPDATE_AMOUNT',
     id,
     amount,
  }

}
