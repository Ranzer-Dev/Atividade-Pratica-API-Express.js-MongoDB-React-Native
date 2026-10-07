import { Alert, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { useAuth } from './AuthContext';

export const CabecalhoMenu = ({ navigation }) => {
    const { user, logout } = useAuth();
    const navigateTo = (screen) => navigation.navigate('Início', { screen });

    const sair = async () => {
        try {
            await logout();
            navigateTo('Home');
        } catch (error) {
            Alert.alert('Não foi possível sair', error.message);
        }
    };

    return (
        <View style={{ backgroundColor: '#C0C0C0', padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Avatar.Icon size={54} icon="account" style={{ backgroundColor: '#F2A900' }} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text variant="titleMedium" style={{ color: 'white', fontWeight: 'bold' }}>
                        {user?.name || 'Visitante'}
                    </Text>
                    <Text variant="bodySmall" style={{ color: 'white' }} numberOfLines={1}>
                        {user?.email || 'Acesso público'}
                    </Text>
                </View>
            </View>
            {user ? (
                <>
                    <Button icon="account" textColor="white" onPress={() => navigateTo('Perfil')}>Meu perfil</Button>
                    <Button icon="logout" textColor="white" onPress={sair}>Sair</Button>
                </>
            ) : (
                <Button icon="login" textColor="white" onPress={() => navigateTo('Acesso')}>Entrar ou cadastrar</Button>
            )}
        </View>
    );
};
