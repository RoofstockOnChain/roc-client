import { FC } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import { config } from '../config';

const FooterInner = styled(Box)`
  background-color: #151920;
  color: #fff;
  padding: 1rem;
`;

const ContractAddress = styled('span')`
  background: linear-gradient(90deg, #fa8e36 1.54%, #ce8dc7 96.4%);
  background-clip: text;
  color: transparent;
  font-weight: 900;
  font-size: 16px;
`;

const DividerStyled = styled(Divider)`
  background-color: #424c60;
`;

export const Footer: FC = () => {
  const { verifiedSmartContract } = config;

  return (
    <FooterInner component="footer">
      <Box padding="3rem" textAlign="center">
        <Typography variant="body1">
          Verified smart contract address:{' '}
          <ContractAddress>{verifiedSmartContract}</ContractAddress>
        </Typography>
      </Box>
      <DividerStyled />
      <Box padding="3rem" textAlign="center">
        <img
          src="/images/home/man-walking-with-dog.png"
          alt="Man walking with dog."
        />
      </Box>
      <Typography variant="body2">
        The offerings available through Roofstock onChain include non-fungible
        tokens referred to as Homes onChain, each representing a single-family
        property-owning limited liability company. Homes onChain are not offered
        through any real estate brokerage firm or agent and are not securities
        as defined by the U.S. Securities and Exchange Commission Act. Neither
        Roofstock onChain nor its agents, employees, or affiliates serve as your
        advisor, agent, broker, contracting agent, or fiduciary and do not
        provide, or offer to provide, financial, investment, legal, real estate,
        or tax advice.
      </Typography>
      <br />
      <Typography variant="body2">
        Transacting on the blockchain, trading cybercurrency, and holding real
        property through a limited liability company may all have tax
        implications. You agree that you are solely responsible for determining
        what, if any, taxes apply to your transaction.
      </Typography>
      <br />
      <Typography variant="body2">
        All Roofstock onChain transactions are facilitated by Smart Contracts
        deployed on the Ethereum blockchain. The Ethereum blockchain requires
        the payment of a transaction fee (a “Gas Fee”) for every transaction
        that occurs on the Ethereum blockchain, and thus every blockchain
        transaction occurring on the Platform. The value of the Gas Fee changes,
        often unpredictably, and is entirely outside of the control of Roofstock
        onChain. You agree that under no circumstances will a contract,
        agreement, offer, sale, bid, or other transaction be invalidated,
        revocable, retractable, or otherwise unenforceable on the basis that the
        Gas Fee for the given transaction was unknown, too high, or otherwise
        unacceptable.
      </Typography>
      <br />
      <Typography variant="body2">
        Illustrations represent artistic interpretation and rendering of key
        architectural and design elements, and are not exact replicas of
        property. Actual grading, landscaping, proportions, scale, or other
        features of property may differ from drawing.
      </Typography>
    </FooterInner>
  );
};