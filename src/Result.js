import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import CartContext from "./KosaricaContext.js";
import Modal from "./Modal";

const Result = ({ data }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [modal, setModal] = useState({ show: false, product: null });

  const handleAddToCart = (product) => {
    addToCart(product);
    setModal({ show: true, product });
  };

  const closeModal = () => setModal({ show: false, product: null });

  const goToCart = () => {
    closeModal();
    navigate("/cart");
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="result">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={() => navigate(`/details/${item.type}/${item.subtype}/${item.id}`)}>
            Detalji
          </button>
          <button onClick={() => handleAddToCart(item)}>
            Dodaj u košaricu
          </button>
        </div>
      ))}

      {modal.show && modal.product && (
        <Modal onClose={closeModal} onConfirm={goToCart}>
          <h3>Proizvod "{modal.product.name}" je dodan u košaricu!</h3>
        </Modal>
      )}
    </div>
  );
};

export default Result;

