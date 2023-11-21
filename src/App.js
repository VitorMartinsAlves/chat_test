import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Conecta ao servidor Socket.io (o mesmo servidor que você configurou anteriormente)

function App() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        // Escuta por mensagens do servidor e atualiza o estado
        socket.on('chat message', (msg) => {
            setMessages([...messages, { user: 'Amigo', text: msg }]);
        });

        return () => {
            // Desconecta o socket quando o componente é desmontado
            socket.disconnect();
        };
    }, [messages]);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, { user: 'Você', text: inputMessage }]);
            socket.emit('chat message', inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <p key={index} className={message.user === 'Você' ? 'user-message' : 'friend-message'}>
                        <strong>{message.user}:</strong> {message.text}
                    </p>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    );
}

export default App;
