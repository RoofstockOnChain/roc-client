import { FC, useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { config } from '../../config';
import { useFaqs } from '../../hooks/useFaqs';
import { Faq } from '../../models/Faq';

export const Faqs: FC = () => {
  const { howItWorksUrl } = config;
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const { getFaqs } = useFaqs();

  useEffect(() => {
    const faqs = getFaqs();
    setFaqs(faqs);
  }, [getFaqs]);

  return (
    <Box
      component="section"
      color="#fff"
      paddingTop="100px"
      paddingBottom="100px"
      sx={{ backgroundColor: 'rgb(66, 76, 96);' }}
    >
      <Container className="faq-container">
        <Typography variant="h2">FAQs</Typography>
        <Box
          display="flex"
          flexDirection="column"
          rowGap="2.5rem"
          marginTop="3rem"
        >
          {faqs.map((faq, index) => (
            <div key={index}>
              <Typography component="h3" variant="h5">
                {faq.question}
              </Typography>
              <Typography variant="body1">{faq.answer}</Typography>
            </div>
          ))}
        </Box>
        <Box marginTop="3rem">
          <Button
            href={howItWorksUrl}
            rel="noreferrer"
            target="_blank"
            variant="outlined"
            color="inherit"
          >
            Learn more
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
