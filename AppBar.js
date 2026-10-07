import { useCallback, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Appbar, Button, Portal, Snackbar, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './css/Styles';
import ModCard from './Cards';
import ContentForm from './ContentForm';
import { useAuth } from './AuthContext';
import { api } from './api';

const AppBar = ({ navigation }) => {
    const { token, user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editorVisible, setEditorVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState('');

    const loadItems = useCallback(async () => {
        setLoading(true);
        try {
            setItems(await api.getContent());
            setError('');
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        loadItems();
    }, [loadItems]));

    const openEditor = (item = null) => {
        setEditingItem(item);
        setEditorVisible(true);
    };

    const saveItem = async ({ title, subtitle, description, image, removeImage }) => {
        setSaving(true);
        try {
            const saved = editingItem
                ? await api.updateContent(editingItem._id, { title, subtitle, description }, token)
                : await api.createContent({ title, subtitle, description }, token);
            if (!editingItem) setEditingItem(saved);
            if (image) {
                await api.uploadImage(saved._id, image, token);
            } else if (removeImage && editingItem?.imageUrl) {
                await api.deleteImage(saved._id, token);
            }
            setEditorVisible(false);
            setNotice('Conteúdo salvo com sucesso.');
            await loadItems();
        } catch (requestError) {
            Alert.alert('Não foi possível salvar', requestError.message);
        } finally {
            setSaving(false);
        }
    };

    const deleteItem = (item) => {
        Alert.alert('Excluir conteúdo', `Deseja excluir "${item.title}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.deleteContent(item._id, token);
                        await loadItems();
                    } catch (requestError) {
                        Alert.alert('Não foi possível excluir', requestError.message);
                    }
                },
            },
        ]);
    };

    const deleteImage = (item) => {
        Alert.alert('Excluir imagem', `Deseja excluir a imagem de "${item.title}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir imagem',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.deleteImage(item._id, token);
                        await loadItems();
                    } catch (requestError) {
                        Alert.alert('Não foi possível excluir a imagem', requestError.message);
                    }
                },
            },
        ]);
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="menu" iconColor="white" onPress={() => navigation.openDrawer()} />
                <Appbar.Content title="Technologic" titleStyle={styles.title} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Pesquisa')} />
                <Appbar.Action
                    icon={user ? 'account-check' : 'account'}
                    onPress={() => navigation.navigate(user ? 'Perfil' : 'Acesso')}
                />
            </Appbar.Header>

            {user ? (
                <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                    <Text variant="bodyMedium">Olá, {user.name}</Text>
                    <Button icon="plus" onPress={() => openEditor()}>Novo conteúdo</Button>
                </View>
            ) : null}

            {loading ? (
                <Text style={{ margin: 20 }}>Carregando conteúdos...</Text>
            ) : error ? (
                <View style={{ padding: 20 }}>
                    <Text>{error}</Text>
                    <Button onPress={loadItems}>Tentar novamente</Button>
                </View>
            ) : items.length === 0 ? (
                <Text style={{ margin: 20 }}>Nenhum conteúdo cadastrado.</Text>
            ) : (
                <ScrollView style={styles.cards} contentContainerStyle={styles.cardsContent}>
                    {items.map((item) => (
                        <ModCard
                            key={item._id}
                            item={item}
                            isAuthenticated={Boolean(user)}
                            onEdit={() => openEditor(item)}
                            onDelete={() => deleteItem(item)}
                            onDeleteImage={() => deleteImage(item)}
                        />
                    ))}
                </ScrollView>
            )}

            <ContentForm
                visible={editorVisible}
                item={editingItem}
                saving={saving}
                onDismiss={() => setEditorVisible(false)}
                onSave={saveItem}
            />
            <Portal>
                <Snackbar visible={Boolean(notice)} onDismiss={() => setNotice('')}>
                    {notice}
                </Snackbar>
            </Portal>
        </View>
    );
};

export default AppBar;
