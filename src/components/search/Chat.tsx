import React, { FC, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAiChat } from '@/hooks/useAiChat';

const ChatBubble = styled(Box)`
  border: 1px solid grey;
  border-radius: 10px;
  color: white;
  padding: 0 0.25rem;
`;

export const Chat: FC = () => {
  const chatStackRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>('');
  const { messages, addUserMessage, loading } = useAiChat();

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
      <Stack direction="row">
        <ChatBubble>
          <Typography>
            We suggest starting with the basics like bedrooms, bathrooms, square
            footage and budget
          </Typography>
        </ChatBubble>
      </Stack>
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
