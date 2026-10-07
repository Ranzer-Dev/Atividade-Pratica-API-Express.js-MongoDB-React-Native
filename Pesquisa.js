import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Text, TextInput } from 'react-native-paper';
import ModCard from './Cards';
import { api } from './api';

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
                if (active) setError(requestError.message);
            } finally {
                if (active) setLoading(false);
            }
        }, 250);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [query]);

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Pesquisa" />
            </Appbar.Header>
            <TextInput
                label="Pesquisar conteúdos"
                placeholder="Digite um título ou termo..."
                mode="outlined"
                value={query}
                onChangeText={setQuery}
                autoCapitalize="none"
                style={{ margin: 16 }}
            />
            {loading ? (
                <Text style={{ marginHorizontal: 16 }}>Buscando...</Text>
            ) : error ? (
                <Text style={{ marginHorizontal: 16 }}>{error}</Text>
            ) : items.length === 0 ? (
                <Text style={{ marginHorizontal: 16 }}>Nenhum registro encontrado.</Text>
            ) : (
                <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 0 }}>
                    {items.map((item) => <ModCard key={item._id} item={item} isAuthenticated={false} />)}
                </ScrollView>
            )}
        </View>
    );
};

export default Pesquisa;
