export interface exBufferedFile {
  fieldName: string;
  originalName: string;
  encoding: string;
  mimeType: AppMimeType;
  size: number;
  buffer: Buffer;
}

export interface HasFile {
  file: Buffer | string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {}

export interface StoredFileMetadata {
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}

export type AppMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';
