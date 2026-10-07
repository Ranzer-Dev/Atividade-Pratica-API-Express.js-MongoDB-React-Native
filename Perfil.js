import { View } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';
import { useAuth } from './AuthContext';
import { styles } from './css/Styles';

export const Perfil = ({ navigation }) => {
    const { user, logout } = useAuth();

    const sair = async () => {
        await logout();
        navigation.navigate('Home');
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Meu perfil" />
            </Appbar.Header>
            <View style={{ alignItems: 'center', padding: 28 }}>
                <Avatar.Icon size={88} icon="account" />
                <Text variant="headlineSmall" style={{ marginTop: 16 }}>{user?.name || 'Visitante'}</Text>
                <Text variant="bodyLarge" style={{ marginTop: 4 }}>{user?.email || ''}</Text>
                {user ? <Button icon="logout" style={{ marginTop: 20 }} onPress={sair}>Sair</Button> : null}
            </View>
        </View>
    );
};
