export interface AllFileResponse {
  fileId: string; //67a9f0a0432c4764167af7ba
  name: string;
  size: number;
  versionInfo: {
    id: string;
    name: string;
  };
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
  AITags: null;
}

export interface SingleFileResponse {
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  fileId: string;
  tags?: null;
  AITags?: null;
  versionInfo: {
    id: string;
    name: string;
  };
  embeddedMetadata?: {
    DateCreated: string;
    DateTimeCreated: string;
  };
  isPublished?: boolean;
  customCoordinates: null;
  customMetadata?: { sensitive: boolean };
  isPrivateFile: boolean;
  url: string;
  thumbnail: string;
  fileType: string;
  filePath: string;
  height: number;
  width: number;
  size: number;
  hasAlpha: boolean;
  mime: string;
}
