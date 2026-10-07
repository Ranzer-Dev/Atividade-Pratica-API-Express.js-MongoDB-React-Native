import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';
import SplashScreen from './SplashScreen';
import AppBar from './AppBar';
import Pesquisa from './Pesquisa';
import Acesso from './Acesso';
import Login from './Login';
import Cadastro from './Cadastro';
import { Perfil } from './Perfil';
import { CabecalhoMenu } from './CabecaMenu';
import { AuthProvider, useAuth } from './AuthContext';
import { theme } from './theme/theme';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={AppBar} />
            <Stack.Screen name="Pesquisa" component={Pesquisa} />
            <Stack.Screen name="Acesso" component={Acesso} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Perfil" component={Perfil} />
        </Stack.Navigator>
    );
}

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => (
                <View style={{ flex: 1 }}>
                    <CabecalhoMenu navigation={props.navigation} />
                    <DrawerContentScrollView {...props} />
                </View>
            )}
        >
            <Drawer.Screen name="Início" component={StackNavigator} />
            <Drawer.Screen name="Séries" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

function AppContent() {
    const { ready } = useAuth();
    if (!ready) return <SplashScreen />;
    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </PaperProvider>
    );
}
