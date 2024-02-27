export interface CollectionDescriptor {
  description: string;
  translatedFields?: any[];
  fields?: any[];
  isSingleton: boolean;
  isPage?: boolean;
  isHidden?: boolean;
  translationField?: any;
  relations?: any[];
  noTranslation?: boolean;
  translationsDisplayTemplate?: string;
}

export interface CollectionsMap {
  [key: string]: CollectionDescriptor;
}
