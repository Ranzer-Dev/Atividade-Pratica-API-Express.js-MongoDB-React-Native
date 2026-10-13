import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';
import SplashScreen from './components/SplashScreen';
import AppBar from './screens/AppBar';
import Pesquisa from './screens/Pesquisa';
import Acesso from './screens/Acesso';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import { Perfil } from './screens/Perfil';
import { CabecalhoMenu } from './components/CabecaMenu';
import { AuthProvider, useAuth } from './context/AuthContext';
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
    screenOptions={{
        headerShown: false,
        drawerStyle: {
            backgroundColor: '#0B0B0F',
        },
    }}
    drawerContent={(props) => (
        <View style={{ flex: 1, backgroundColor: '#0B0B0F' }}>
            <CabecalhoMenu navigation={props.navigation} />

            <DrawerContentScrollView
                {...props}
                style={{
                    backgroundColor: '#1f1f27',
                }}
                contentContainerStyle={{
                    backgroundColor: '#1f1f27',
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
            />
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
