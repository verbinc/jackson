import { useRouter } from 'next/router';
import { CreateSAMLConnection as CreateSAML, CreateOIDCConnection as CreateOIDC } from '@boxyhq/react-ui/sso';

import { errorToast } from '@components/Toaster';

interface CreateSSOConnectionProps {
  setupLinkToken: string;
  idpType: 'saml' | 'oidc';
}

const CreateSSOConnection = ({ setupLinkToken, idpType }: CreateSSOConnectionProps) => {
  const router = useRouter();

  const onSuccess = () => {
    router.push({
      pathname: '/setup/[token]/sso-connection',
      query: { token: setupLinkToken },
    });
  };

  const onError = (message: string) => {
    errorToast(message);
  };

  const urls = {
    save: `/api/setup/${setupLinkToken}/sso-connection`,
  };

  const classNames = {
    button: 'btn btn-primary mt-4',
  };

  return idpType === 'saml' ? (
    <CreateSAML
      variant='basic'
      classNames={classNames}
      urls={urls}
      successCallback={onSuccess}
      errorCallback={onError}
    />
  ) : (
    <CreateOIDC
      variant='basic'
      classNames={classNames}
      urls={urls}
      successCallback={onSuccess}
      errorCallback={onError}
    />
  );
};

export default CreateSSOConnection;
