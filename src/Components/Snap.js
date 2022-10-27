import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const OuterForMargin = styled.div`
  margin-top: 200px;
`;

const InnerForCenter = styled.div`
  display: flex;
  justify-content: center;
`;

function Snap() {
  const images = [
    "snap/01.jpg",
    "snap/02.jpg",
    "snap/03.jpg",
    "snap/04.jpg",
    "snap/05.jpg",
    "snap/06.jpg",
    "snap/07.jpg",
    "snap/08.jpg",
    "snap/09.jpg",
    "snap/10.jpg",
    "snap/11.jpg",
    "snap/12.jpg",
  ];
  return (
    <OuterForMargin>
      <Carousel touch={true} fade={true}>
        {images.map((e, idx) => (
          <Carousel.Item interval={3000}>
            <InnerForCenter>
              <img className="d-block w-75" src={e} alt={idx} />
            </InnerForCenter>
          </Carousel.Item>
        ))}
      </Carousel>
    </OuterForMargin>
  );
}

export default Snap;
