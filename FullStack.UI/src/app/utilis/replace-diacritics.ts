/* --------------------------------------- REPLACE DIACRITICS FOR FILTER --------------------------------------- */
export const REPLACE_DIACRITICS = (text: any) => text ? text.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '') : '';

/* --------------------------------------- REPLACE ONLY DIACRITICS FOR FILTER --------------------------------------- */
export const REPLACE_ONLY_DIACRITICS = (text: any) => text ? text.normalize('NFKD').replace(/[^\w\s.\-_\/]/g, '') : '';
