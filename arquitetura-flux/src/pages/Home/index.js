import React, { useState, useEffect } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
import api from '../../services/api';
import {formatPrice} from '../../utils/format';
function Home({addToCartRequest}){
  const amount = useSelector(state => state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount
  }, {}))

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProdutcs(){
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))

      setProducts(data)
    }

    loadProdutcs();
  }, []);


  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  return (
    <ProductList>
      {products.map(product => (
         <li key={product.id}>
         <img
           src={product.image}
           alt={product.title}
         />
         <strong>{product.title}</strong>
      <span>{product.priceFormatted}</span>

         <button type="button"
          onClick={()=> handleAddProduct(product.id)}
         >
           <div>
             <MdAddShoppingCart size={36} color="#FFF" />{amount[product.id] || 0}
           </div>
           <span>ADICIONAR AO CARRINHO</span>
         </button>
       </li>

      ))}

    </ProductList>
  );
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
export default connect(null, mapDispatchToProps)(Home);
