import { Document } from '../../models/Document';
import React, { FC, Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import * as _ from 'lodash';

interface PropertyDocumentsProps {
  documents?: Document[];
}

export const PropertyDocuments: FC<PropertyDocumentsProps> = ({
  documents,
}) => {
  const documentsByCategory = _.groupBy(documents, (x) => x.category);
  const documentGroups = _.map(documentsByCategory, (documents, category) => ({
    category: category,
    documents: documents,
  }));

  if (!documents) {
    return <></>;
  }

  return (
    <List disablePadding>
      <>
        {documentGroups.map((documentGroup, documentGroupIndex) => (
          <Fragment key={documentGroupIndex}>
            <ListSubheader>{documentGroup.category}</ListSubheader>
            {documentGroup.documents.map((document, documentIndex) => (
              <ListItem key={documentIndex} disableGutters>
                <ListItemButton href={document.documentUrl} target="_blank">
                  <ListItemText primary={document.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </Fragment>
        ))}
      </>
    </List>
  );
};
