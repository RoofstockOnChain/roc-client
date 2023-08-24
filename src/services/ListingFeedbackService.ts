const listingFeedbackLocalStorageKey = 'listing-feedback';

export const addListingFeedbackForUser = (listingFeedback: ListingFeedback) => {
  if (listingFeedback.feedback.trim() !== '') {
    const listingFeedbackForUser = getListingFeedbackForUser();
    listingFeedbackForUser.push(listingFeedback);
    localStorage.setItem(
      listingFeedbackLocalStorageKey,
      JSON.stringify(listingFeedbackForUser)
    );
  }
};

export const getListingFeedbackForUser = (): ListingFeedback[] => {
  const listingFeedbackLocalStorage = localStorage.getItem(
    listingFeedbackLocalStorageKey
  );
  return listingFeedbackLocalStorage
    ? JSON.parse(listingFeedbackLocalStorage)
    : [];
};

export const clearListingFeedbackForUser = () => {
  localStorage.removeItem(listingFeedbackLocalStorageKey);
};

export type ListingFeedback = {
  mlsListingId: string;
  feedback: string;
};
