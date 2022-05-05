import { CognitoUserAmplify } from "@aws-amplify/ui";
import { Auth, Hub } from "aws-amplify";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContextProps {
  children: ReactElement;
}

interface IUserContext {
  user: CognitoUserAmplify | null;
  setUser: Dispatch<SetStateAction<CognitoUserAmplify | null>>;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const AuthContext = ({ children }: IAuthContextProps): ReactElement => {
  const [user, setUser] = useState<CognitoUserAmplify | null>(null);

  const checkAuthenticatedUser = async () => {
    try {
      const authenticatedUser: CognitoUserAmplify =
        await Auth.currentAuthenticatedUser();

      if (!authenticatedUser) {
        throw new Error("No logged in user!");
      }
      setUser(authenticatedUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    // Check on first mount, regardless of event type
    checkAuthenticatedUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      checkAuthenticatedUser();
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth = (): IUserContext => useContext(UserContext);

export { AuthContext, useAuth };
