
export * from './mainContent';
export * from './aboutContent';
export * from './servicesContent';
export * from './contactContent';
export * from './blogContent';
export * from './legalContent';
export * from './countriesContent';

// Combine all content for backwards compatibility
import { mainContent } from './mainContent';
import { aboutContent } from './aboutContent';
import { servicesContent } from './servicesContent';
import { contactContent } from './contactContent';
import { blogContent } from './blogContent';
import { legalContent } from './legalContent';
import { countriesContent } from './countriesContent';

export const pageSectionContents = {
  ...mainContent,
  ...aboutContent,
  ...servicesContent,
  ...contactContent,
  ...blogContent,
  ...legalContent,
  ...countriesContent,
};
