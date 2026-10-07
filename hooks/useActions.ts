import { PortfolioActions, usePortfolioContext } from './PortfolioStateContext';

export const useActions = (): PortfolioActions => {
  const { actions } = usePortfolioContext();
  return actions;
};
