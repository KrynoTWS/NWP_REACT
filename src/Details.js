import { Component } from "react";
import { useParams} from "react-router";
import { useNavigate } from "react-router";
import CartContext from "./KosaricaContext.js";
import Modal from "./Modal";


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: null,
      modal: { show: false, product: null }
    };
  }

  componentDidMount() {
    const { type, subtype, id } = this.props;

    fetch("http://demo4392601.mockable.io/tipovi")
      .then((res) => res.json())
      .then((data) => {
        const productList = (data.itemsData[type] && data.itemsData[type][subtype]) || [];
        const product = productList.find((item) => item.id === Number(id));

        this.setState({
          product,
          loading: false,
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        this.setState({ loading: false });
      });
  }
  
  handleAddToCart = () => {
    const { product } = this.state;
    if (product) {
      this.context.addToCart(product);
      this.setState({ modal: { show: true, product } });
    }
  };

  closeModal = () => {
    this.setState({ modal: { show: false, product: null } });
  };

  goToCart = () => {
    this.closeModal();
    this.props.navigate("/cart");
  };
  
  render() {
    const { product, loading,modal } = this.state;

    if (loading) return <h2>Učitavanje...</h2>;
    if (!product) return <h2>Proizvod nije pronađen.</h2>;

    return (
      <div className="details">
        <h1>{product.name}</h1>
        <p><strong>Vrsta:</strong> {product.type}</p>
        <p><strong>Podvrsta:</strong> {product.subtype}</p>
        <p><strong>Opis:</strong> {product.description}</p>
        <button onClick={this.handleAddToCart}>
          Dodaj u košaricu
        </button>
        <button onClick={() => this.props.navigate("/")}>
          Povratak na pretraživanje
        </button>
        {modal.show && (
          <Modal onClose={this.closeModal} onConfirm={this.goToCart}>
            <h3>Proizvod "{modal.product?.name}" je dodan u košaricu!</h3>
          </Modal>
        )}
      </div>
    );
  }
}
Details.contextType = CartContext;

const WrappedDetails = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return <Details {...props} {...params} navigate={navigate}/>;
};

export default WrappedDetails;
