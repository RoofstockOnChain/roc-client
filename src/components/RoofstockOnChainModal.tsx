import { FC, ReactNode } from 'react';
import {
  Divider,
  Modal,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';

const ModalInner = styled(Paper)`
  display: flex;
  flex-direction: column;
  max-height: calc(100dvh - 4rem);
  max-width: 100%;
  min-width: calc(400px - 2rem);
  padding: 1rem;

  @media only screen and (max-width: 399px) {
    min-width: calc(100% - 2rem);
    width: 100%;
  }
`;

const ModalHeading = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

export const ModalFooter = styled(Stack)`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

interface RoofstockOnChainModalProps {
  headerText?: string;
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  footer?: ReactNode;
}

export const RoofstockOnChainModal: FC<RoofstockOnChainModalProps> = ({
  headerText,
  open,
  onClose,
  children,
  footer,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalInner>
        {headerText && (
          <>
            <ModalHeading>
              <Typography variant="h4">{headerText}</Typography>
            </ModalHeading>
            <Divider />
          </>
        )}
        {children}
        {footer && (
          <>
            <Divider />
            <ModalFooter>{footer}</ModalFooter>
          </>
        )}
      </ModalInner>
    </Modal>
  );
};
