import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export const Perfil = ({ navigation }) => {
    const { user, logout } = useAuth();

    const sair = async () => {
        await logout();
        navigation.navigate('Home');
    };

    return (
        <View style={styles.screen}>

            {/* APPBAR */}
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction
                    iconColor="#F5F3FF"
                    onPress={() => navigation.goBack()}
                />

                <Appbar.Content
                    title="Meu perfil"
                    titleStyle={styles.headerTitle}
                />
            </Appbar.Header>

            {/* PERFIL */}
            <View style={styles.content}>

                <View style={styles.avatarContainer}>
                    <Avatar.Icon
                        size={92}
                        icon="account"
                        color="#FFFFFF"
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.name}>
                    {user?.name || 'Visitante'}
                </Text>

                <Text style={styles.email}>
                    {user?.email || ''}
                </Text>

                {user ? (
                    <View style={styles.actions}>
                        <Button
                            mode="outlined"
                            icon="logout"
                            textColor="#FDA4AF"
                            style={styles.logoutButton}
                            contentStyle={styles.buttonContent}
                            labelStyle={styles.buttonLabel}
                            onPress={sair}
                        >
                            SAIR DA CONTA
                        </Button>
                    </View>
                ) : null}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#0B0B0F',
    },

    header: {
        backgroundColor: '#0B0B0F',
        elevation: 0,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '800',
    },

    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingTop: 60,
    },

    avatarContainer: {
        width: 116,
        height: 116,
        borderRadius: 36,
        backgroundColor: '#211735',
        borderWidth: 1,
        borderColor: '#4C3575',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatar: {
        backgroundColor: '#7C3AED',
    },

    name: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '800',
        marginTop: 24,
        textAlign: 'center',
    },

    email: {
        color: '#9693A1',
        fontSize: 14,
        marginTop: 7,
        textAlign: 'center',
    },

    actions: {
        width: '100%',
        marginTop: 42,
    },

    logoutButton: {
        borderColor: '#5A3039',
        borderRadius: 15,
    },

    buttonContent: {
        height: 52,
    },

    buttonLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});