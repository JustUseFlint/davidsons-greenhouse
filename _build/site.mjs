// Real business facts only. Source: davidsongreenhouse.com (pages fetched Nov 2026) + its 2025 Garden Guide PDF.
export const SITE = 'https://justuseflint.github.io/davidsons-greenhouse/';
export const V = '1a';
export const NAME = 'Davidson Greenhouse & Nursery';
export const LEGAL = 'Davidson Greenhouse & Nursery, Inc.';
export const PHONE = '(765) 364-0556';
export const TEL = 'tel:+17653640556';
export const STREET = '3147 E Ladoga Road';
export const CITY = 'Crawfordsville';
export const REGION = 'IN';
export const ZIP = '47933';
export const ADDR = `${STREET}, ${CITY}, ${REGION} ${ZIP}`;
export const MAPS = 'https://www.google.com/maps/dir/?api=1&destination=3147+E+Ladoga+Road%2C+Crawfordsville%2C+IN+47933';
export const MAP_EMBED = 'https://maps.google.com/maps?q=3147%20E%20Ladoga%20Road%2C%20Crawfordsville%2C%20IN%2047933&z=14&output=embed';
export const FB = 'https://www.facebook.com/DavidsonGreenhouse';
export const IG = 'https://www.instagram.com/davidson_greenhouse_nursery/';
export const PIN = 'https://www.pinterest.com/DavidsonGreenhouse/';
export const OLD = 'https://davidsongreenhouse.com/';
export const CONTACT_FORM = 'https://davidsongreenhouse.com/contact-us/';
export const JOBS = 'https://form.jotform.com/233025873430148';
export const VENDOR = 'https://davidsongreenhouse.com/application/';
export const GUIDE_PDF = 'https://davidsongreenhouse.com/files/2025/02/2025_Garden_Guide_(3).pdf';
// [day, open, close] 24h; null = closed. From the Contact Us page.
export const HOURS = [['Monday', 9, 17], ['Tuesday', 9, 17], ['Wednesday', 9, 17], ['Thursday', 9, 17], ['Friday', 9, 17], ['Saturday', 10, 15], ['Sunday', null, null]];
export const fmtH = h => (h > 12 ? h - 12 : h) + ':00' + (h >= 12 ? ' pm' : ' am');
