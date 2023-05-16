import SnowflakeId from 'snowflake-id';

export const snowflake = new SnowflakeId({
  mid: 1,
  offset: (2023 - 1970) * 31536000 * 1000,
});
