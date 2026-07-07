export const generateSlug = (text, id) => {
  if (!text) return id ? id.toString() : '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // remove accents
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
};
