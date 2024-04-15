import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { aws_config } from '../aws-config/aws-config';

export const cognitoIdentityProvider = new CognitoIdentityProvider({
  region: aws_config.aws_cognito_region,
  credentials: {
    accessKeyId: aws_config.aws_access_key_id,
    secretAccessKey: aws_config.aws_secret_access_key,
  },
});
