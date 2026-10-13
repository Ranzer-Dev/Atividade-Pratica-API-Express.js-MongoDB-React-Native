import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // =========================
    // GERAL
    // =========================

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B0B0F',
    },

    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
        backgroundColor: '#191820',
        borderRadius: 150,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    subtitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#9693A1',
    },

    // =========================
    // HEADER
    // =========================

    header: {
        backgroundColor: '#0B0B0F',
        elevation: 0,
    },

    // =========================
    // TABS
    // =========================

    tabs: {
        height: 100,
        flexGrow: 0,
    },

    tab: {
        height: 45,
        paddingHorizontal: 20,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#191820',

        borderWidth: 1,
        borderColor: '#292732',

        borderRadius: 12,
        marginTop: 10,
    },

    tabText: {
        color: '#DDD6FE',
        fontSize: 14,
        fontWeight: '700',
    },

    // =========================
    // CARDS
    // =========================

    cards: {
        flex: 1,
    },

    cardsContent: {
        paddingHorizontal: 10,
        paddingTop: 0,
        paddingBottom: 30,
    },

    card: {
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 10,

        borderRadius: 18,
        backgroundColor: '#18181F',

        borderWidth: 1,
        borderColor: '#292832',

        elevation: 0,
    },

    cardTitle: {
        fontWeight: '800',
        color: '#FFFFFF',
    },

    cardCover: {
        minHeight: 180,
        backgroundColor: '#211E2A',
    },

    // =========================
    // ACESSO
    // =========================

    acesso: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#0B0B0F',
    },

    acessoTitulo: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 10,
    },

    acessoTexto: {
        textAlign: 'center',
        color: '#9693A1',
        marginBottom: 30,
    },

    acessoButton: {
        marginBottom: 15,
        borderRadius: 15,
    },

    // =========================
    // LOGIN
    // =========================

    loginContainer: {
        flex: 1,
        backgroundColor: '#0B0B0F',
    },

    loginContent: {
        padding: 25,
        backgroundColor: '#0B0B0F',
    },

    loginTitulo: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 30,
    },

    loginTexto: {
        textAlign: 'center',
        color: '#9693A1',
        marginTop: 5,
        marginBottom: 30,
    },

    input: {
        marginBottom: 15,
        backgroundColor: '#15141B',
    },

    loginButton: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
    },

    // =========================
    // CADASTRO
    // =========================

    cadastroContainer: {
        flex: 1,
        backgroundColor: '#0B0B0F',
    },

    cadastroContent: {
        padding: 25,
        backgroundColor: '#0B0B0F',
    },

    cadastroTitulo: {
        textAlign: 'center',
        fontWeight: '800',
        color: '#FFFFFF',
        marginTop: 20,
    },

    cadastroTexto: {
        textAlign: 'center',
        color: '#9693A1',
        marginTop: 5,
        marginBottom: 25,
    },

    cadastroButton: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
    },

    // =========================
    // CABEÇALHO DO MENU
    // =========================

    menuHeader: {
        padding: 20,
        backgroundColor: '#111116',
    },
});