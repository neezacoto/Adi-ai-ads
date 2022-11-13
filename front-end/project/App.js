
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './app/navigation/AppNavigator';
import PromptNavigator from './app/navigation/PromptNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

