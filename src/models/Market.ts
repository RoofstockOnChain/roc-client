export type Market = {
  cbsaCode: number;
  name: string;
  latitude: number;
  longitude: number;
  stateCode: string;
  yearlySummaries: YearlySummary;
  marketBackgroundImageUrl: string;
};

type YearlySummary = {
  medianHouseholdIncomes: any[];
  population: any[];
  unemploymentRate: any[];
};
