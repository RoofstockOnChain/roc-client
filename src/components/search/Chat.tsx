import React, { FC, useState } from 'react';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAiChat } from '@/hooks/useAiChat';

export const Chat: FC = () => {
  const [message, setMessage] = useState<string>('');
  const { messages, addUserMessage, loading } = useAiChat();

  const addMessage = async () => {
    await addUserMessage(message);
    setMessage('');
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1} style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <Stack
            key={index}
            direction="row"
            justifyContent={message.role === 'user' ? 'start' : 'end'}
          >
            <Chip label={message.content} />
          </Stack>
        ))}
      </Stack>
      <Divider variant="middle" />
      <Stack direction="row">
        <Chip
          variant="outlined"
          label="We suggest starting with the basics like bedrooms, bathrooms, square footage and budget"
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          multiline
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
