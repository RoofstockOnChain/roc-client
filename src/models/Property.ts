import { PropertyManagement } from './PropertyManagement';
import { Image } from './Image';
import { Document } from './Document';
import { Attribute } from './Attribute';

export type Property = {
  contractAddress: string;
  token: string;
  name: string;
  description: string;
  imageUrl: string;
  attributes: Attribute[];
  latitude?: number;
  longitude?: number;
  videoWalkthroughUrl?: string;
  threeDTourUrl?: string;
  images?: Image[];
  documents?: Document[];
  propertyManagementOptions: PropertyManagement[];
  cbsaCode?: number;
};
