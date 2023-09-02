export const reducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART": {
            return { ...state, cart: [...state.cart, action.payload] }
        }

        case "REMOVE_FROM_CART": {
            const itemRemaining = state.cart.filter((val) => val._id != action.payload)
            console.log(itemRemaining)
            return { ...state, cart: itemRemaining }
        }

                    type: "CLEAR_CART"
        case "CLEAR_CART": {
            return { ...state, cart: [] }
        }

        default: {
            return state;
        }
    }
}