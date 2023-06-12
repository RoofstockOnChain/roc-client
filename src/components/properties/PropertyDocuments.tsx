import { Document } from '../../models/Document';
import { FC } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface PropertyDocumentsProps {
  documents?: Document[];
}

export const PropertyDocuments: FC<PropertyDocumentsProps> = ({
  documents,
}) => {
  if (!documents) {
    return <></>;
  }

  return (
    <List>
      {documents.map((document, index) => (
        <ListItem key={index}>
          <ListItemButton href={document.documentUrl} target="_blank">
            <ListItemText primary={document.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
