import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { product });
  };

  return (
    <section>
      <figure>
        <img
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
          alt={product.name}
          src={product.image_url}
          width={240}
        />
        <figcaption>
          <strong>{product.supplier.name}</strong>
        </figcaption>
        <figcaption onClick={handleCardClick} style={{ cursor: "pointer" }}>
          {product.name} - ${product.price}
        </figcaption>
      </figure>
    </section>
  );
};

export default ProductCard;
