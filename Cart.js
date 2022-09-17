import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';

const PRODUCT = [
  {
    id: '0',
    image:
      'https://t-2.tstatic.net/jogja/foto/bank/images2/Produk-es-krim-di-Tempo-Gelato.jpg',
    name: 'Es Krim',
    price: 8000,
    stock: 26,
  },
  {
    id: '1',
    image:
      'https://static.republika.co.id/uploads/images/inpicture_slide/biskuit-ilustrasi-_160715070932-588.jpg',
    name: 'Biskuit',
    price: 4000,
    stock: 50,
  },
  {
    id: '2',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxopvi5QPbVpWraWzcbyT7eHTSbdeFMcyvEQy6-O-1Eb7iebryp36-Q5nDSbfC1xW-5k&usqp=CAU',
    name: 'Coklat',
    price: 10000,
    stock: 30,
  },
  {
    id: '3',
    image:
      'https://res.cloudinary.com/dk0z4ums3/image/upload/v1621838354/attached_image/manfaat-keju-yang-sayang-untuk-dilewatkan.jpg',
    name: 'Keju',
    price: 11500,
    stock: 80,
  },
  {
    id: '4',
    image:
      'https://ecs7.tokopedia.net/blog-tokopedia-com/uploads/2020/11/Featured_Cara-Membuat-Donat-Varian-Lezat-dan-Tips-Agar-Empuk.jpg',
    name: 'Donat',
    price: 12000,
    stock: 24,
  },
];

const CounterButton = React.memo(({text, onPress}): React.Node => (
  <Pressable onPress={onPress} style={styles.counterButton}>
    <Text style={styles.counterText}>{text}</Text>
  </Pressable>
));

const onChangeProduct = ({quantity, cart, item, setCart}): void => {
  const product = cart.filter(value => value.id === item.id)[0];
  const newProduct = {
    ...product,
    quantity,
  };

  if (product) {
    const newCart = cart.map(obj =>
      newProduct.id === obj.id ? newProduct : obj,
    );
    setCart(newCart);
  }
};

const OrderCounter = ({onAddOrder, onReduceOrder, stock}): React.Node => {
  const [totalOrder, setTotalOrder] = React.useState(0);

  return (
    <View style={styles.commonContainer}>
      <CounterButton
        text="-"
        onPress={() => onReduceOrder(totalOrder, setTotalOrder)}
      />
      <Text style={styles.totalCounter}>{totalOrder}</Text>
      <CounterButton
        text="+"
        onPress={() => onAddOrder(totalOrder, setTotalOrder)}
      />
      <Text style={styles.stockAvailable}> {stock} stock available</Text>
    </View>
  );
};

const Product = React.memo(
  ({name, image, price, stock, onAddOrder, onReduceOrder}): React.Node => (
    <View style={styles.product}>
      <Image style={styles.productImage} source={{uri: image}} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.price}>Rp. {price}</Text>
        <OrderCounter
          onAddOrder={onAddOrder}
          onReduceOrder={onReduceOrder}
          stock={stock}
        />
      </View>
    </View>
  ),
);

const OrderItem = React.memo(({name, price, quantity}): React.Node => (
  <View style={styles.order}>
    <Text style={styles.orderText}>• {name}</Text>
    <Text style={styles.orderText}>
      x{quantity} = {quantity * price}
    </Text>
  </View>
));

const Cart: () => React.Node = () => {
  const [cart, setCart] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const _totalPrice = cart.reduce((accumulator, {price, quantity}) => {
      return accumulator + price * quantity;
    }, 0);
    setTotalPrice(_totalPrice);
  }, [cart]);

  const onAddOrder = React.useCallback(
    item =>
      (totalOrder, setTotalOrder): void => {
        if (totalOrder < item.stock) {
          const newTotalOrder = totalOrder + 1;
          setTotalOrder(newTotalOrder);

          if (totalOrder !== 0) {
            onChangeProduct({quantity: newTotalOrder, setCart, cart, item});
          } else {
            setCart([...cart, {...item, quantity: 1}]);
          }
        }
      },
    [cart],
  );

  const onReduceOrder = React.useCallback(
    item =>
      (totalOrder, setTotalOrder): void => {
        if (totalOrder > 0) {
          const newTotalOrder = totalOrder - 1;
          setTotalOrder(newTotalOrder);

          if (newTotalOrder) {
            onChangeProduct({quantity: newTotalOrder, setCart, cart, item});
          } else {
            setCart(cart.filter(x => x.id !== item.id));
          }
        }
      },
    [cart],
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productContainer}>
          {PRODUCT.map(item => (
            <Product
              image={item.image}
              name={item.name}
              price={item.price}
              stock={item.stock}
              key={item.id}
              onAddOrder={onAddOrder(item)}
              onReduceOrder={onReduceOrder(item)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.orderContainer}>
        {cart.map(item => (
          <OrderItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
        <View style={styles.checkoutContainer}>
          <Text style={styles.totalPrice}>Rp. {totalPrice}</Text>
          <Pressable style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout ({cart.length})</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  orderContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    backgroundColor: 'white',
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: 'orange',
    padding: 15,
  },
  commonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 70,
    height: 70,
    margin: 10,
  },
  productInfo: {
    height: 70,
    flex: 1,
    justifyContent: 'space-around',
  },
  counterButton: {
    borderWidth: 0.5,
    borderColor: '#B0BEC5',
  },
  counterText: {
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  totalCounter: {
    width: 40,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#B0BEC5',
  },
  price: {
    color: '#FF6D00',
    fontWeight: 'bold',
  },
  stockAvailable: {
    color: '#FF6D00',
  },
  totalPrice: {
    marginHorizontal: 20,
    color: '#FF6D00',
    fontWeight: 'bold',
    fontSize: 20,
  },
  order: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 2,
  },
  orderText: {
    width: 110,
    fontWeight: 'bold',
  },
  checkoutText: {
    fontWeight: 'bold',
  },
});
