import { LocalRootState, usePortfolioContext } from './PortfolioStateContext';

export function useTypedSelector<TSelected>(
  selector: (state: LocalRootState) => TSelected
): TSelected {
  const { state } = usePortfolioContext();
  return selector(state);
}
