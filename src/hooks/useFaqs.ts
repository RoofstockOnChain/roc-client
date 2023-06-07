import { faqs } from '../data/faqs';

export const useFaqs = () => {
  const getFaqs = () => faqs;

  return {
    getFaqs,
  };
};
