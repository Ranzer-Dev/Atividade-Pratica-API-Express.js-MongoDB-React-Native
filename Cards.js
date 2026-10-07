import { Card, IconButton, Text } from 'react-native-paper';
import { api } from './api';
import { styles } from './css/Styles';

const ModCard = ({ item, isAuthenticated, onEdit, onDelete, onDeleteImage }) => (
    <Card style={styles.card}>
        <Card.Title title={item.title} subtitle={item.subtitle || ''} titleStyle={styles.cardTitle} />
        {item.imageUrl ? (
            <Card.Cover style={styles.cardCover} source={{ uri: api.imageUrl(item.imageUrl) }} />
        ) : null}
        {item.description ? (
            <Card.Content style={{ paddingTop: 12 }}>
                <Text>{item.description}</Text>
            </Card.Content>
        ) : null}
        {isAuthenticated ? (
            <Card.Actions>
                {item.imageUrl ? (
                    <IconButton icon="image-remove" accessibilityLabel="Excluir imagem" onPress={onDeleteImage} />
                ) : null}
                <IconButton icon="pencil" accessibilityLabel="Editar conteúdo" onPress={onEdit} />
                <IconButton icon="delete" accessibilityLabel="Excluir conteúdo" onPress={onDelete} />
            </Card.Actions>
        ) : null}
    </Card>
);

export default ModCard;
