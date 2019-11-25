import { Logger, LoggerType } from '@sorg/log';
export const colors = {
  info: '#f64',
  yellow: '#fc2',
  blue: '#08f',
  gray: '#aaa',
  error: '#f00'
};
export const logger = new Logger<{
  info: LoggerType;
  error: LoggerType;
}>({
  info: {
    styles: [colors.info, colors.yellow]
  },
  error: {
    styles: [colors.error]
  }
});
