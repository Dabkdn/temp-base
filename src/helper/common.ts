import { IMAGE_FILE_MIMES } from '../constants/file';
import * as FileType from 'file-type';
import axios from 'axios';

export const validImageMineType = (mineType: string) => {
    const str = mineType ? mineType : '';
    return IMAGE_FILE_MIMES.includes(str.toLowerCase());
};

export const isValidImage = async (base64: string) => {
    const decoded = Buffer.from(base64, 'base64');
    const decodedAsString = decoded.toString();
    if (decodedAsString.indexOf('</svg>') > -1) {
        /// svg file
        return 'image/svg+xml';
    }
    const fileType: any = await FileType.fromBuffer(decoded);
    if (!fileType) {
        return false;
    }
    if (!validImageMineType(fileType.mime)) {
        return false;
    }
    return fileType.ext;
};

export const getFileTypeFromBase64 = async (
    base64: string
): Promise<{ mime: string; ext: string } | any> => {
    const decoded = Buffer.from(base64, 'base64');
    const decodedAsString = decoded.toString();
    if (decodedAsString.indexOf('</svg>') > -1) {
        /// svg file
        return {
            mime: 'image/svg+xml',
            ext: 'svg',
        };
    }
    const fileType = await FileType.fromBuffer(decoded);
    return fileType;
};

export const randomNumber = (length: number) => {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
};

export const bufferToString = (buf: Buffer) => {
    return buf.toString('utf8').replace('\n', '');
};
