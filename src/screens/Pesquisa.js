import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Icon, Text, TextInput } from 'react-native-paper';
import ModCard from '../components/Cards';
import { api } from '../services/api';

const Pesquisa = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const results = await api.getContent(query.trim());

                if (active) {
                    setItems(results);
                    setError('');
                }
            } catch (requestError) {
                if (active) {
                    setError(requestError.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }, 250);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [query]);

    return (
        <View style={styles.screen}>

            {/* APPBAR */}
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction
                    iconColor="#F5F3FF"
                    onPress={() => navigation.goBack()}
                />

                <Appbar.Content
                    title="Pesquisar"
                    titleStyle={styles.headerTitle}
                />
            </Appbar.Header>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* CAMPO DE PESQUISA */}
                <View style={styles.searchContainer}>
                    <Icon
                        source="magnify"
                        size={22}
                        color="#A78BFA"
                    />

                    <TextInput
                        placeholder="Digite um título ou termo..."
                        placeholderTextColor="#777381"
                        value={query}
                        onChangeText={setQuery}
                        autoCapitalize="none"
                        autoCorrect={false}
                        mode="flat"
                        textColor="#FFFFFF"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        style={styles.searchInput}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#9B97A8',
                            },
                        }}
                    />
                </View>

                {/* TÍTULO */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            {query.trim() ? 'RESULTADOS' : 'CONTEÚDOS'}
                        </Text>

                        {!loading && !error && items.length > 0 ? (
                            <Text style={styles.sectionSubtitle}>
                                {items.length}{' '}
                                {items.length === 1
                                    ? 'resultado encontrado'
                                    : 'resultados encontrados'}
                            </Text>
                        ) : null}
                    </View>

                    <View style={styles.sectionMark} />
                </View>

                {/* RESULTADOS */}
                {loading ? (
                    <View style={styles.stateCard}>
                        <Text style={styles.stateText}>
                            Buscando conteúdos...
                        </Text>
                    </View>
                ) : error ? (
                    <View style={styles.stateCard}>
                        <Text style={styles.errorTitle}>
                            Não foi possível realizar a pesquisa
                        </Text>

                        <Text style={styles.stateText}>
                            {error}
                        </Text>
                    </View>
                ) : items.length === 0 ? (
                    <View style={styles.stateCard}>
                        <Text style={styles.emptyTitle}>
                            Nenhum conteúdo encontrado
                        </Text>

                        <Text style={styles.stateText}>
                            Tente pesquisar por outro título ou termo.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.cards}>
                        {items.map((item) => (
                            <View
                                key={item._id}
                                style={styles.cardWrapper}
                            >
                                <ModCard
                                    item={item}
                                    isAuthenticated={false}
                                />
                            </View>
                        ))}
                    </View>
                )}

            </ScrollView>
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

    scroll: {
        flex: 1,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 36,
    },

    searchContainer: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#191820',
        borderWidth: 1,
        borderColor: '#292732',
        borderRadius: 17,
        paddingLeft: 14,
        marginBottom: 26,
    },

    searchInput: {
        flex: 1,
        height: 54,
        backgroundColor: 'transparent',
        fontSize: 14,
        paddingHorizontal: 8,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },

    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
    },

    sectionSubtitle: {
        color: '#898693',
        fontSize: 12,
        marginTop: 4,
    },

    sectionMark: {
        width: 34,
        height: 3,
        borderRadius: 2,
        backgroundColor: '#A855F7',
    },

    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 16,
    },

    cardWrapper: {
        width: '48.5%',
    },

    stateCard: {
        backgroundColor: '#17161E',
        borderColor: '#292732',
        borderWidth: 1,
        borderRadius: 18,
        padding: 20,
    },

    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    errorTitle: {
        color: '#FDA4AF',
        fontSize: 16,
        fontWeight: '700',
    },

    stateText: {
        color: '#9693A1',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 8,
    },
});

export default Pesquisa;