import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';

const Acesso = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            {/* APPBAR */}
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction
                    iconColor="#F5F3FF"
                    onPress={() => navigation.goBack()}
                />

                <Appbar.Content
                    title="Acesso"
                    titleStyle={styles.headerTitle}
                />
            </Appbar.Header>

            {/* CONTEÚDO */}
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>◈</Text>
                </View>

                <Text style={styles.title}>
                    Bem-vindo ao ContentHub
                </Text>

                <Text style={styles.description}>
                    Entre na sua conta ou crie um novo cadastro para
                    gerenciar seus conteúdos.
                </Text>

                {/* JÁ TENHO CADASTRO */}
                <Button
                    mode="contained"
                    icon="login"
                    buttonColor="#7C3AED"
                    textColor="#FFFFFF"
                    style={styles.primaryButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    onPress={() => navigation.navigate('Login')}
                >
                    JÁ TENHO CADASTRO
                </Button>

                {/* NÃO TENHO CADASTRO */}
                <Button
                    mode="outlined"
                    icon="account-plus"
                    textColor="#DDD6FE"
                    style={styles.secondaryButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
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
        paddingTop: 70,
        alignItems: 'center',
    },

    iconContainer: {
        width: 76,
        height: 76,
        borderRadius: 24,
        backgroundColor: '#211735',
        borderWidth: 1,
        borderColor: '#4C3575',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
    },

    icon: {
        color: '#A78BFA',
        fontSize: 34,
        fontWeight: '800',
    },

    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        letterSpacing: -0.5,
    },

    description: {
        color: '#9693A1',
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 38,
        maxWidth: 330,
    },

    primaryButton: {
        width: '100%',
        borderRadius: 15,
        marginBottom: 12,
    },

    secondaryButton: {
        width: '100%',
        borderRadius: 15,
        borderColor: '#5B467D',
    },

    buttonContent: {
        height: 52,
    },

    buttonLabel: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
});

export default Acesso;