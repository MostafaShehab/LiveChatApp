import styles from './styles.module.css';
import './custom.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const [show, setShow] = useState('');

    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
    };

    useEffect(() => {
        socket.on('room_full', () => {
            setShow(true);
        });

        return () => socket.off('room_full');
    }, [socket]);

    const navigate = useNavigate();
    useEffect(() => {
        socket.on('admit_to_room', () => {
            navigate('/chat', { replace: true });
        });

        return () => socket.off('admit_to_room');
    }, [socket]);

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                { show  && <Alert key='warning' variant='warning' onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>
                        Room is full, kindly try another room.
                    </Alert.Heading>
                </Alert> }
                <h1>{`Select a room to join`}</h1>
                <input
                    className={styles.input}
                    placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                />

                <select
                    className={styles.input}
                    onChange={(e) => setRoom(e.target.value)}
                >
                    <option>-- Select Room --</option>
                    <option value='1'>Room 1</option>
                    <option value='2'>Room 2</option>
                </select>

                <button
                    className='btn btn-secondary'
                    style={{ width: '100%' }}
                    onClick={joinRoom}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default Home;
