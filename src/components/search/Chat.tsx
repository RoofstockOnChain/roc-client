import React, { FC, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage } from '@azure/openai';

const ChatBubble = styled(Box)`
  p {
    background-color: #fbe35a;
    border-radius: 16px;
    color: #232a35;
    margin: 0.5rem 0;
    padding: 0.25rem 0.5rem;
  }
`;

interface ChatProps {
  messages: ChatMessage[];
  addUserMessage: (message: string) => void;
  loading: boolean;
}

export const Chat: FC<ChatProps> = ({ messages, addUserMessage, loading }) => {
  const chatStackRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>('');

  const addMessage = async () => {
    setMessage('');
    await addUserMessage(message);
    scrollToBottomOfChatStack();
  };

  const scrollToBottomOfChatStack = () => {
    if (chatStackRef?.current) {
      setTimeout(() => {
        chatStackRef.current?.scroll({
          top: chatStackRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack
        ref={chatStackRef}
        spacing={1}
        style={{ height: '300px', overflowY: 'scroll' }}
      >
        {messages
          .filter((x) => x.role === 'user' || x.role === 'assistant')
          .map((message, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent={message.role === 'user' ? 'start' : 'end'}
            >
              <ChatBubble>
                <ReactMarkdown>{message.content ?? ''}</ReactMarkdown>
              </ChatBubble>
            </Stack>
          ))}
      </Stack>
      <Divider variant="middle" />
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          placeholder="Tell us what you are looking for..."
          helperText="Press Enter or Go to proceed"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={async (e) => {
            if (e.key === 'Enter' && message) {
              await addMessage();
            }
          }}
          disabled={loading}
        />
        <Box>
          <IconButton
            size="large"
            color="primary"
            onClick={addMessage}
            disabled={!message}
            style={{
              backgroundColor: '#FBE35A',
              borderRadius: '5px',
              color: 'inherit',
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};
