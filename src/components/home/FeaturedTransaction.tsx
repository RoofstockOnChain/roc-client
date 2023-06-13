import { config } from '../../config';
import dayjs from 'dayjs';
import { Box, Container, Link, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

export const FeaturedTransaction = () => {
  const { rsOnChainTwitterUrl } = config;
  const transaction = {
    featuredImage: {
      main: '/images/home/149-cottage-sold.svg',
      tablet: '/images/home/149-cottage-sold-tablet.svg',
      mobile: '/images/home/149-cottage-sold-mobile.svg',
    },
    callToAction:
      'Our first Home onChain with blockchain financing traded as an NFT',
    date: dayjs(new Date(2022, 9, 14)),
    etherscanLink:
      'https://etherscan.io/tx/0xa7b2e89bf6d5cc8e605c1cf8823e532f87790d1816f7f98df77127cc98a1021f',
  };

  return (
    <Box
      component="section"
      paddingTop="100px"
      paddingBottom="100px"
      minHeight={(theme) =>
        theme.breakpoints.up('md')
          ? undefined
          : theme.breakpoints.up('sm')
          ? '730px'
          : '900px'
      }
      sx={(theme) => ({
        backgroundImage: `url(${transaction.featuredImage.mobile})`,
        backgroundSize: 'cover',
        [theme.breakpoints.up('sm')]: {
          backgroundImage: `url(${transaction.featuredImage.tablet})`,
        },
        [theme.breakpoints.up('md')]: {
          backgroundImage: `url(${transaction.featuredImage.main})`,
        },
      })}
    >
      <Container maxWidth="xl">
        <Typography
          bgcolor={(theme) => theme.palette.custom.slate}
          variant="h5"
          width="fit-content"
          sx={{ paddingInline: '0.5rem', paddingBlock: '0.25rem' }}
          color="#fff"
        >
          <time dateTime={transaction.date.format('YYYY-MM-DD')}>
            {transaction.date.format('MMMM DD, YYYY')}
          </time>
        </Typography>
        <Typography variant="h4" maxWidth="620px" marginTop="1.5rem">
          <Typography
            bgcolor="#B6F1CA"
            color={(theme) => theme.palette.custom.slate}
            component="mark"
            display="inline"
            lineHeight="1.75"
            variant="h4"
            sx={{ boxDecorationBreak: 'clone', paddingInline: '0.5rem' }}
          >
            {transaction.callToAction}
          </Typography>
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          columnGap="1rem"
          marginTop="1.5rem"
        >
          <img
            src="/images/etherscan-logo.svg"
            alt="Etherscan logo"
            width="40px"
            height="40px"
          />
          <Typography component="p" variant="body1" color="#fff">
            View transaction on{' '}
            <Link
              href={transaction.etherscanLink}
              rel="noreferrer"
              target="_blank"
              color="#fff"
              display="inline-flex"
              alignItems="center"
            >
              Etherscan
              <OpenInNew fontSize="small" sx={{ marginLeft: '0.25rem' }} />
            </Link>
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          columnGap="1rem"
          marginTop="1.5rem"
        >
          <img
            src="/images/twitter-logo.svg"
            alt="Twitter logo"
            width="40px"
            height="40px"
          />
          <Typography variant="body1" color="#fff">
            <Link
              href={rsOnChainTwitterUrl}
              rel="noreferrer"
              target="_blank"
              underline="always"
              color="#fff"
            >
              Follow us on Twitter
            </Link>{' '}
            to know when new homes onChain are coming
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
