import { FC } from 'react';
import { useGetProperties } from '../hooks/useGetProperties';
import {
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const StyledTableCell = styled(TableCell)`
  width: 0;
`;

export const Administration: FC = () => {
  const { properties } = useGetProperties();

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property, index) => (
            <TableRow key={index}>
              <StyledTableCell>
                <Checkbox />
              </StyledTableCell>
              <TableCell>{property.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
