// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const aws_config = {
  aws_cognito_region: process.env.COGNITO_REGION,
  aws_cognito_user_pool_id: process.env.COGNITO_USER_POOL_ID,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
};
