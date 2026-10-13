import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
    Appbar,
    TextInput,
    Button,
    Text,
} from 'react-native-paper';

import { useAuth } from '../context/AuthContext';

const Cadastro = ({ navigation }) => {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmarSenha, setConfirmarSenha] = React.useState('');

    const [mostrarSenha, setMostrarSenha] = React.useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = React.useState(false);
    const [enviando, setEnviando] = React.useState(false);

    const { register } = useAuth();

    const cadastrar = async () => {
        if (!nome.trim() || !email.trim() || !senha) {
            Alert.alert(
                'Dados obrigatórios',
                'Preencha nome, e-mail e senha.'
            );
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert(
                'Senhas diferentes',
                'A confirmação deve ser igual à senha.'
            );
            return;
        }

        setEnviando(true);

        try {
            await register(nome.trim(), email.trim(), senha);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(
                'Não foi possível cadastrar',
                error.message
            );
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
                    title="Cadastro"
                    titleStyle={styles.headerTitle}
                />
            </Appbar.Header>

            {/* FORMULÁRIO */}
            <View style={styles.content}>

                <Text style={styles.title}>
                    Criar conta
                </Text>

                <Text style={styles.subtitle}>
                    Preencha seus dados para começar.
                </Text>

                {/* NOME */}
                <TextInput
                    label="Nome"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={setNome}
                    mode="outlined"
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
                            icon="account-outline"
                            color="#8F7AB5"
                        />
                    }
                    style={styles.input}
                />

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

                {/* CONFIRMAR SENHA */}
                <TextInput
                    label="Confirmar senha"
                    placeholder="Digite novamente sua senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    mode="outlined"
                    secureTextEntry={!mostrarConfirmacao}
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
                            icon="lock-check-outline"
                            color="#8F7AB5"
                        />
                    }
                    right={
                        <TextInput.Icon
                            icon={
                                mostrarConfirmacao
                                    ? 'eye-off'
                                    : 'eye'
                            }
                            color="#8F7AB5"
                            onPress={() =>
                                setMostrarConfirmacao(
                                    !mostrarConfirmacao
                                )
                            }
                        />
                    }
                    style={styles.input}
                />

                {/* CADASTRAR */}
                <Button
                    mode="contained"
                    icon="account-plus"
                    buttonColor="#7C3AED"
                    textColor="#FFFFFF"
                    style={styles.registerButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    loading={enviando}
                    disabled={enviando}
                    onPress={cadastrar}
                >
                    CADASTRAR
                </Button>

                {/* JÁ POSSUI CONTA */}
                <Button
                    mode="text"
                    icon="login"
                    textColor="#C4B5FD"
                    style={styles.loginButton}
                    labelStyle={styles.loginLabel}
                    onPress={() =>
                        navigation.navigate('Login')
                    }
                >
                    JÁ TENHO CADASTRO
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
        paddingTop: 45,
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
        marginBottom: 28,
    },

    input: {
        backgroundColor: '#15141B',
        marginBottom: 14,
    },

    registerButton: {
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

    loginButton: {
        borderRadius: 12,
        marginTop: 12,
    },

    loginLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

export default Cadastro;