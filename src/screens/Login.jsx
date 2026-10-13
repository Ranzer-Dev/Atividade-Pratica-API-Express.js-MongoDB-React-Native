import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
    Appbar,
    TextInput,
    Button,
    Text,
} from 'react-native-paper';

import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [mostrarSenha, setMostrarSenha] = React.useState(false);
    const [enviando, setEnviando] = React.useState(false);
    const { login } = useAuth();

    const entrar = async () => {
        if (!email.trim() || !senha) {
            Alert.alert(
                'Dados obrigatórios',
                'Informe seu e-mail e sua senha.'
            );
            return;
        }

        setEnviando(true);

        try {
            await login(email.trim(), senha);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Não foi possível entrar', error.message);
        } finally {
            setEnviando(false);
        }
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
                    title="Login"
                    titleStyle={styles.headerTitle}
                />
            </Appbar.Header>

            {/* FORMULÁRIO */}
            <View style={styles.content}>

                <Text style={styles.title}>
                    Bem-vindo!
                </Text>

                <Text style={styles.subtitle}>
                    Entre com sua conta para continuar.
                </Text>

                {/* E-MAIL */}
                <TextInput
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textColor="#FFFFFF"
                    placeholderTextColor="#777381"
                    outlineColor="#34313E"
                    activeOutlineColor="#8B5CF6"
                    theme={{
                        colors: {
                            onSurfaceVariant: '#9B97A8',
                        },
                    }}
                    left={
                        <TextInput.Icon
                            icon="email-outline"
                            color="#8F7AB5"
                        />
                    }
                    style={styles.input}
                />

                {/* SENHA */}
                <TextInput
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                    mode="outlined"
                    secureTextEntry={!mostrarSenha}
                    textColor="#FFFFFF"
                    placeholderTextColor="#777381"
                    outlineColor="#34313E"
                    activeOutlineColor="#8B5CF6"
                    theme={{
                        colors: {
                            onSurfaceVariant: '#9B97A8',
                        },
                    }}
                    left={
                        <TextInput.Icon
                            icon="lock-outline"
                            color="#8F7AB5"
                        />
                    }
                    right={
                        <TextInput.Icon
                            icon={mostrarSenha ? 'eye-off' : 'eye'}
                            color="#8F7AB5"
                            onPress={() =>
                                setMostrarSenha(!mostrarSenha)
                            }
                        />
                    }
                    style={styles.input}
                />

                {/* ENTRAR */}
                <Button
                    mode="contained"
                    icon="login"
                    buttonColor="#7C3AED"
                    textColor="#FFFFFF"
                    style={styles.loginButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    loading={enviando}
                    disabled={enviando}
                    onPress={entrar}
                >
                    ENTRAR
                </Button>

                {/* CADASTRO */}
                <Button
                    mode="text"
                    icon="account-plus-outline"
                    textColor="#C4B5FD"
                    style={styles.registerButton}
                    labelStyle={styles.registerLabel}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    NÃO TENHO CADASTRO
                </Button>

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
        paddingHorizontal: 28,
        paddingTop: 65,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
    },

    subtitle: {
        color: '#9693A1',
        fontSize: 15,
        marginTop: 8,
        marginBottom: 34,
    },

    input: {
        backgroundColor: '#15141B',
        marginBottom: 16,
    },

    loginButton: {
        borderRadius: 15,
        marginTop: 8,
    },

    buttonContent: {
        height: 52,
    },

    buttonLabel: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    registerButton: {
        marginTop: 14,
        borderRadius: 12,
    },

    registerLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

export default Login;