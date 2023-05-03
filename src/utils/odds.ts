import * as oddslib from 'oddslib';
import { OddsFormat } from '../redux/reducers/app';
import { round } from 'lodash';

const ODDS_FORMAT_MAPPING: { [key in OddsFormat]: string } = {
  [OddsFormat.eu]: 'decimal',
  [OddsFormat.uk]: 'fractional',
  [OddsFormat.us]: 'moneyline',
};

/**
 *
 * @param value Should be in decimal format (EU)
 * @param format Format to which value should be converted to
 * @returns Converted value
 */
export const converOddsTo = (value: number, format: OddsFormat): string => {
  const odds = oddslib.from('decimal', value);
  let result = odds.to(ODDS_FORMAT_MAPPING[format]);
  if (format === OddsFormat.us) {
    result = round(result);
    return result > 0 ? `+${result}` : result.toString();
  }
  return result.toString();
};

export const getOddsDisplayString = (value: string, format: OddsFormat): string => {
  const valueNum = round(parseFloat(value), 2);
  if (format === OddsFormat.eu) return valueNum.toString();

  return converOddsTo(valueNum, format);
};
