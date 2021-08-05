import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import { useSocket } from '../../Hooks/Socket';
import { Container } from './styles';

const CreateGroup: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    backToSelect,
    removeSelectUser,
    multiRequests,
    selectUsers,
  } = useSocket();
  return (
    <Container>
      <div className="ContentHeader">
        <h1>Nome do seu Grupo</h1>
        <FaChevronLeft size={32} color="#9d4edd" onClick={backToSelect} />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <button type="button" onClick={() => multiRequests(inputValue)}>
        Criar grupo
      </button>
      <div className="ContainerUsers">
        {selectUsers &&
          selectUsers.map(user => (
            <div className="ContainerListSelectUsers" key={user}>
              <p>{user.split('')[0]}</p>
              <div className="ContentUser">
                <div className="TitleUser">
                  <strong>{user}</strong>
                  <IoPersonRemove
                    color="#9d4edd"
                    size={26}
                    onClick={() => removeSelectUser(user)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default CreateGroup;
