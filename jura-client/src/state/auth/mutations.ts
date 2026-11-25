import { useAuthState } from './atoms';

import { useMutation } from '@apollo/client';
import { gql } from '@generated/gql';
import { useNavigate } from 'react-router';
import { usePreferenceState } from '../preference';

const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        ...UserFragment
      }
    }
  }
`);

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuthState();
  const { lastVisitedProjectId } = usePreferenceState();

  return useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login({ accessToken: data.login.accessToken, user: data.login.user });
      if (lastVisitedProjectId) {
        navigate(`/project/${lastVisitedProjectId}/issues`);
      } else {
        navigate('/dashboard');
      }
    },
    onError: () => {
      logout();
    }
  });
};
