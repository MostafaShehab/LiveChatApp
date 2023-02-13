
import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send-message';
import Room from './room';

const Chat = ({ username, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
      <Room socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
