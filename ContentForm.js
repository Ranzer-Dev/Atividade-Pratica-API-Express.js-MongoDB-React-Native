import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, View } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const ContentForm = ({ visible, item, saving, onDismiss, onSave }) => {
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
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert('Permissão necessária', 'Permita o acesso às fotos para selecionar uma imagem.');
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });
            if (!result.canceled) {
                setImage(result.assets[0]);
                setRemoveImage(false);
            }
        } catch (error) {
            Alert.alert('Não foi possível abrir as fotos', error.message);
        }
    };

    const submit = () => {
        if (!title.trim()) {
            Alert.alert('Campo obrigatório', 'Informe o título do conteúdo.');
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
            <Dialog visible={visible} onDismiss={saving ? undefined : onDismiss}>
                <Dialog.Title>{item ? 'Editar conteúdo' : 'Novo conteúdo'}</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 12 }}>
                        <TextInput label="Título" value={title} onChangeText={setTitle} mode="outlined" />
                        <TextInput label="Subtítulo" value={subtitle} onChangeText={setSubtitle} mode="outlined" style={{ marginTop: 10 }} />
                        <TextInput label="Descrição" value={description} onChangeText={setDescription} mode="outlined" multiline style={{ marginTop: 10 }} />
                        {image ? (
                            <Image source={{ uri: image.uri }} style={{ height: 170, marginTop: 12 }} resizeMode="cover" />
                        ) : item?.imageUrl && !removeImage ? (
                            <Text style={{ marginTop: 12 }}>A imagem atual será mantida.</Text>
                        ) : null}
                        <View style={{ marginTop: 8 }}>
                            <Button icon="image-edit" onPress={chooseImage}>Selecionar imagem</Button>
                            {(image || (item?.imageUrl && !removeImage)) ? (
                                <Button textColor="#B00020" onPress={() => {
                                    setImage(null);
                                    setRemoveImage(Boolean(item?.imageUrl));
                                }}>Remover imagem</Button>
                            ) : null}
                        </View>
                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button disabled={saving} onPress={onDismiss}>Cancelar</Button>
                    <Button loading={saving} disabled={saving} onPress={submit}>Salvar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default ContentForm;
