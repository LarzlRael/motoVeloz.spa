export interface StoreResponseInterface {
  __v:                number;
  _id:                string;
  createdAt:          Date;
  imageUrl:           string;
  storeAddress?:      string;
  storeDescription?:  string;
  storeName?:         string;
  storePhone?:        string;
  storePublicImageId: null;
  storeUrl:           string;
  updatedAt:          Date;
 }
 
 export interface RedesSociales {
  _id:          string;
  nombre:       string;
  urlRedSocial: string;
}
