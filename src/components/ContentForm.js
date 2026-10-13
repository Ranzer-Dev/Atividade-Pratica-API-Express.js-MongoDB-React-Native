import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    Dialog,
    Portal,
    Text,
    TextInput,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const ContentForm = ({
    visible,
    item,
    saving,
    onDismiss,
    onSave,
}) => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() => {
        setTitle(item?.title || '');
        setSubtitle(item?.subtitle || '');
        setDescription(item?.description || '');
        setImage(null);
        setRemoveImage(false);
    }, [item, visible]);

    const chooseImage = async () => {
        try {
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                Alert.alert(
                    'Permissão necessária',
                    'Permita o acesso às fotos para selecionar uma imagem.'
                );
                return;
            }

            const result =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    allowsEditing: true,
                    quality: 0.8,
                });

            if (!result.canceled) {
                setImage(result.assets[0]);
                setRemoveImage(false);
            }
        } catch (error) {
            Alert.alert(
                'Não foi possível abrir as fotos',
                error.message
            );
        }
    };

    const submit = () => {
        if (!title.trim()) {
            Alert.alert(
                'Campo obrigatório',
                'Informe o título do conteúdo.'
            );
            return;
        }

        onSave({
            title: title.trim(),
            subtitle: subtitle.trim(),
            description: description.trim(),
            image,
            removeImage,
        });
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={saving ? undefined : onDismiss}
                style={styles.dialog}
            >
                <Dialog.Title style={styles.dialogTitle}>
                    {item ? 'Editar conteúdo' : 'Novo conteúdo'}
                </Dialog.Title>

                <Dialog.ScrollArea style={styles.scrollArea}>
                    <ScrollView
                        contentContainerStyle={styles.form}
                        showsVerticalScrollIndicator={false}
                    >
                        <TextInput
                            label="Título"
                            placeholder="Digite o título"
                            value={title}
                            onChangeText={setTitle}
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
                            style={styles.input}
                        />

                        <TextInput
                            label="Subtítulo"
                            placeholder="Digite um subtítulo"
                            value={subtitle}
                            onChangeText={setSubtitle}
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
                            style={styles.input}
                        />

                        <TextInput
                            label="Descrição"
                            placeholder="Digite uma descrição"
                            value={description}
                            onChangeText={setDescription}
                            mode="outlined"
                            multiline
                            numberOfLines={5}
                            textColor="#FFFFFF"
                            placeholderTextColor="#777381"
                            outlineColor="#34313E"
                            activeOutlineColor="#8B5CF6"
                            theme={{
                                colors: {
                                    onSurfaceVariant: '#9B97A8',
                                },
                            }}
                            style={[
                                styles.input,
                                styles.descriptionInput,
                            ]}
                        />

                        {/* PREVIEW DA IMAGEM */}
                        {image ? (
                            <Image
                                source={{ uri: image.uri }}
                                style={styles.imagePreview}
                                resizeMode="cover"
                            />
                        ) : item?.imageUrl && !removeImage ? (
                            <View style={styles.currentImageInfo}>
                                <Text style={styles.currentImageText}>
                                    A imagem atual será mantida.
                                </Text>
                            </View>
                        ) : null}

                        {/* AÇÕES DA IMAGEM */}
                        <View style={styles.imageActions}>
                            <Button
                                mode="outlined"
                                icon="image-edit"
                                textColor="#C4B5FD"
                                style={styles.imageButton}
                                contentStyle={styles.imageButtonContent}
                                labelStyle={styles.buttonLabel}
                                onPress={chooseImage}
                            >
                                {image
                                    ? 'Alterar imagem'
                                    : 'Selecionar imagem'}
                            </Button>

                            {(image ||
                                (item?.imageUrl && !removeImage)) ? (
                                <Button
                                    mode="text"
                                    icon="image-remove"
                                    textColor="#E8798A"
                                    style={styles.removeButton}
                                    labelStyle={styles.removeLabel}
                                    onPress={() => {
                                        setImage(null);
                                        setRemoveImage(
                                            Boolean(item?.imageUrl)
                                        );
                                    }}
                                >
                                    Remover imagem
                                </Button>
                            ) : null}
                        </View>
                    </ScrollView>
                </Dialog.ScrollArea>

                <Dialog.Actions style={styles.actions}>
                    <Button
                        disabled={saving}
                        textColor="#9693A1"
                        onPress={onDismiss}
                    >
                        CANCELAR
                    </Button>

                    <Button
                        mode="contained"
                        buttonColor="#7C3AED"
                        textColor="#FFFFFF"
                        loading={saving}
                        disabled={saving}
                        style={styles.saveButton}
                        contentStyle={styles.saveButtonContent}
                        labelStyle={styles.saveLabel}
                        onPress={submit}
                    >
                        SALVAR
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        backgroundColor: '#15141B',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#292732',
    },

    dialogTitle: {
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '800',
    },

    scrollArea: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#292732',
    },

    form: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        paddingBottom: 14,
    },

    input: {
        backgroundColor: '#1B1A22',
        marginBottom: 14,
    },

    descriptionInput: {
        minHeight: 120,
        textAlignVertical: 'top',
    },

    imagePreview: {
        width: '100%',
        height: 180,
        borderRadius: 14,
        marginTop: 2,
        marginBottom: 12,
        backgroundColor: '#211E2A',
    },

    currentImageInfo: {
        backgroundColor: '#211E2A',
        borderWidth: 1,
        borderColor: '#34313E',
        borderRadius: 12,
        padding: 14,
        marginTop: 2,
        marginBottom: 10,
    },

    currentImageText: {
        color: '#9693A1',
        fontSize: 13,
    },

    imageActions: {
        marginTop: 2,
    },

    imageButton: {
        borderColor: '#5B467D',
        borderRadius: 13,
    },

    imageButtonContent: {
        height: 48,
    },

    buttonLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    removeButton: {
        marginTop: 4,
        alignSelf: 'flex-start',
    },

    removeLabel: {
        fontSize: 12,
        fontWeight: '700',
    },

    actions: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#111116',
    },

    saveButton: {
        borderRadius: 12,
        marginLeft: 8,
    },

    saveButtonContent: {
        height: 44,
        paddingHorizontal: 8,
    },

    saveLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

export default ContentForm;