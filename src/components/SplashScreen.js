import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>

            <Image
                source={require('../../assets/logo.jpg')}
                style={styles.logo}
                resizeMode="contain"
            />

            <ActivityIndicator
                size="large"
                color="#A78BFA"
                style={styles.loading}
            />

            <Text style={styles.text}>
                Carregando...
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0B0F',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 220,
        height: 220,
        marginBottom: 28,
        borderRadius: 24,
    },

    loading: {
        marginBottom: 12,
    },

    text: {
        color: '#9693A1',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default SplashScreen;