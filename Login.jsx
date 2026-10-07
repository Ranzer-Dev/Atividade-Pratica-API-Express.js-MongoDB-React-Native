import React from 'react';
import { Alert, View } from 'react-native';

import {
    Appbar,
    TextInput,
    Button,
    Text,
} from 'react-native-paper';

import { styles } from './css/Styles';
import { useAuth } from './AuthContext';

const Login = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [mostrarSenha, setMostrarSenha] = React.useState(false);
    const [enviando, setEnviando] = React.useState(false);
    const { login } = useAuth();

    const entrar = async () => {
        if (!email.trim() || !senha) {
            Alert.alert('Dados obrigatórios', 'Informe seu e-mail e sua senha.');
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

        <View style={styles.loginContainer}>

            {/* APPBAR */}

            <Appbar.Header >

                <Appbar.BackAction
                    iconColor="black"
                    onPress={() => navigation.goBack()}
                />

                <Appbar.Content
                    title="Login"
                    titleStyle={styles.title}
                />

            </Appbar.Header>


            {/* FORMULÁRIO */}

            <View style={styles.loginContent}>

                <Text
                    variant="headlineMedium"
                    style={styles.loginTitulo}
                >
                    Bem-vindo!
                </Text>


                <Text
                    variant="bodyLarge"
                    style={styles.loginTexto}
                >
                    Entre com sua conta
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
                    left={
                        <TextInput.Icon icon="email" />
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
                    left={
                        <TextInput.Icon icon="lock" />
                    }
                    right={
                        <TextInput.Icon
                            icon={mostrarSenha ? 'eye-off' : 'eye'}
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
                    style={styles.loginButton}
                    loading={enviando}
                    disabled={enviando}
                    onPress={entrar}
                >
                    ENTRAR
                </Button>


                {/* CADASTRO */}

                <Button
                    mode="text"
                    icon="account-plus"
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    NÃO TENHO CADASTRO
                </Button>

            </View>

        </View>
    );
};

export default Login;