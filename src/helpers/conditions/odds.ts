import { dictionaries } from '@azuro-org/dictionaries';
export function getOddsPointString({ outcomeId }: { outcomeId: string }) {
  const { pointsId } = dictionaries.outcomes[outcomeId];
  let pointStr = '';
  if (pointsId) pointStr = dictionaries.points[pointsId];
  return pointStr;
}
