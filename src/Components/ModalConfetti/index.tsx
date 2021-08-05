import { FaTrophy, FaMedal } from 'react-icons/fa';
import { Container, ContainerOverlay, Modal, ContainerWinners } from './styles';

interface ModalConfettiProps {
  toggle(): void;
}

const ModalConfetti: React.FC<ModalConfettiProps> = ({ toggle }) => {
  return (
    <Container onClick={toggle}>
      <ContainerOverlay>
        <Modal>
          <h1 className="Title">Vencedores</h1>
          <ContainerWinners>
            <h1>
              Joao
              <div className="ContainerAling">
                <FaTrophy size={40} color="#FFD700" />
              </div>
              {/* <p>+10 coin</p> */}
            </h1>
            <h2>
              Matilda
              <div className="ContainerAling">
                <FaMedal size={30} color="#838996" />
              </div>
              {/* <p>+5 coin</p> */}
            </h2>
            <h3>
              Jose
              <div className="ContainerAling">
                <FaMedal size={20} color="#CD7F32" />
              </div>
              {/* <p>+2 coin</p> */}
            </h3>
          </ContainerWinners>
        </Modal>
      </ContainerOverlay>
    </Container>
  );
};

export { ModalConfetti };
